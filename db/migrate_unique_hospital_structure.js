const pool = require('../config/db');

async function migrateUniqueHospitalStructure() {
  const client = await pool.connect();
  try {
    console.log('--- Starting Hospital Structure Uniqueness Migration & Deduplication ---');
    await client.query('BEGIN');

    // 1. Deduplicate hospital_buildings (per tenant_id, LOWER(TRIM(name)))
    const duplicateBuildings = await client.query(`
      SELECT tenant_id, LOWER(TRIM(name)) as norm_name, array_agg(id ORDER BY created_at ASC, id ASC) as ids
      FROM hospital_buildings
      GROUP BY tenant_id, LOWER(TRIM(name))
      HAVING COUNT(*) > 1
    `);

    for (const row of duplicateBuildings.rows) {
      const primaryId = row.ids[0];
      const duplicateIds = row.ids.slice(1);
      console.log(`Deduplicating building "${row.norm_name}": keeping ${primaryId}, merging/removing ${duplicateIds.join(', ')}`);

      // Re-point rooms
      await client.query(`
        UPDATE hospital_rooms 
        SET building_id = $1 
        WHERE building_id = ANY($2::uuid[])
      `, [primaryId, duplicateIds]);

      // Re-point departments if any
      await client.query(`
        UPDATE departments 
        SET building_id = $1 
        WHERE building_id = ANY($2::uuid[])
      `, [primaryId, duplicateIds]);

      // Delete duplicate buildings
      await client.query(`
        DELETE FROM hospital_buildings 
        WHERE id = ANY($1::uuid[])
      `, [duplicateIds]);
    }

    // 2. Deduplicate hospital_rooms (per tenant_id, building_id, LOWER(TRIM(number_or_name)))
    const duplicateRooms = await client.query(`
      SELECT tenant_id, building_id, LOWER(TRIM(number_or_name)) as norm_name, array_agg(id ORDER BY created_at ASC, id ASC) as ids
      FROM hospital_rooms
      GROUP BY tenant_id, building_id, LOWER(TRIM(number_or_name))
      HAVING COUNT(*) > 1
    `);

    for (const row of duplicateRooms.rows) {
      const primaryId = row.ids[0];
      const duplicateIds = row.ids.slice(1);
      console.log(`Deduplicating room "${row.norm_name}": keeping ${primaryId}, merging/removing ${duplicateIds.join(', ')}`);

      // Re-point beds
      await client.query(`
        UPDATE hospital_beds 
        SET room_id = $1 
        WHERE room_id = ANY($2::uuid[])
      `, [primaryId, duplicateIds]);

      // Delete duplicate rooms
      await client.query(`
        DELETE FROM hospital_rooms 
        WHERE id = ANY($1::uuid[])
      `, [duplicateIds]);
    }

    // 3. Deduplicate hospital_beds (per tenant_id, room_id, LOWER(TRIM(name)))
    const duplicateBeds = await client.query(`
      SELECT tenant_id, room_id, LOWER(TRIM(name)) as norm_name, array_agg(id ORDER BY created_at ASC, id ASC) as ids
      FROM hospital_beds
      GROUP BY tenant_id, room_id, LOWER(TRIM(name))
      HAVING COUNT(*) > 1
    `);

    for (const row of duplicateBeds.rows) {
      const primaryId = row.ids[0];
      const duplicateIds = row.ids.slice(1);
      console.log(`Deduplicating bed "${row.norm_name}": keeping ${primaryId}, merging/removing ${duplicateIds.join(', ')}`);

      // Re-point hospitalizations
      await client.query(`
        UPDATE hospitalizations 
        SET bed_id = $1 
        WHERE bed_id = ANY($2::uuid[])
      `, [primaryId, duplicateIds]);

      // Delete duplicate beds
      await client.query(`
        DELETE FROM hospital_beds 
        WHERE id = ANY($1::uuid[])
      `, [duplicateIds]);
    }

    // 4. Create Unique Indexes
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_building_name_per_tenant 
      ON hospital_buildings(tenant_id, LOWER(TRIM(name)));
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_room_name_per_building 
      ON hospital_rooms(tenant_id, building_id, LOWER(TRIM(number_or_name)));
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_bed_name_per_room 
      ON hospital_beds(tenant_id, room_id, LOWER(TRIM(name)));
    `);

    await client.query('COMMIT');
    console.log('--- Uniqueness constraints and indexes successfully applied! ---');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  migrateUniqueHospitalStructure().then(() => {
    console.log('Done.');
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = migrateUniqueHospitalStructure;
