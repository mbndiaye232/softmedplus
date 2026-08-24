-- ============================================================================
-- SOFTMED PRODUCTION CLEAN SEED DATA
-- Baseline configuration, reference data, practitioners, and services
-- Generated on: 2026-08-24T22:33:15.430Z
-- ============================================================================

SET app.bypass_rls = 'true';

-- 1. TENANTS (4)
INSERT INTO tenants (id, name, slug, email, phone_number, address, ninea_rc, logo_url, stamp_url, is_active, created_at)
VALUES ('ae405816-e93b-4d99-a25f-d1c5745bb896', 'Clinique de l''Espoir', 'espoir', 'contact@espoir.com', '+221338000000', '12, Avenue Cheikh Anta Diop, Dakar, Sénégal', 'N01234567-RC', '/logo-espoir.png', '/stamp-default.png', true, '2026-08-20T12:01:59.989Z')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, logo_url = EXCLUDED.logo_url;
INSERT INTO tenants (id, name, slug, email, phone_number, address, ninea_rc, logo_url, stamp_url, is_active, created_at)
VALUES ('96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'Clinique de la paix', 'paix', 'mbndiaye@sst.best', '+221776473506', '12 rue AmadouAssane NDOYE', 'SD3332', '/uploads/5192e7b3-f574-4018-ab50-5ed46175390d.png', '/uploads/a71482c3-0a55-4a77-9795-80ba6f7f7c40.jpg', true, '2026-08-20T12:28:56.322Z')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, logo_url = EXCLUDED.logo_url;
INSERT INTO tenants (id, name, slug, email, phone_number, address, ninea_rc, logo_url, stamp_url, is_active, created_at)
VALUES ('854246a0-392a-475c-b0db-b34b5cc4dfe7', 'Clinique Test 360', 'test-dpi-1787398551002', 'admin@test-dpi-1787398551002.sn', '+221770000000', NULL, NULL, '/logo-espoir.png', NULL, true, '2026-08-22T11:35:51.157Z')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, logo_url = EXCLUDED.logo_url;
INSERT INTO tenants (id, name, slug, email, phone_number, address, ninea_rc, logo_url, stamp_url, is_active, created_at)
VALUES ('10b0e5e8-1bca-4260-b883-0ab3066fac56', 'Clinique Horizon', 'clinique-test-1787405991341', 'admin.horizon@gmail.com', '+221771234567', 'Mermoz, Dakar', 'SN-DKR-2026-B-999', '/logo-espoir.png', NULL, true, '2026-08-22T13:39:51.945Z')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, logo_url = EXCLUDED.logo_url;

-- 2. USERS (9)
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('06a17beb-f7c7-4b1b-90dc-ce759b64e74c', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'admin@espoir.com', '$2a$10$eB3xwGhBPiWIvszSODaOSO8JsARtC9upbwgqFwFFODf4zaqs5eRqe', 'Awa', 'Diop', 'TENANT_ADMIN', 'ADMIN', '{"users":{"view":true,"create":true,"delete":true,"update":true},"agenda":{"view":true,"create":true,"delete":true,"update":true},"reports":{"view":true,"create":true,"delete":true,"update":true},"invoices":{"view":true,"create":true,"delete":true,"update":true},"patients":{"view":true,"create":true,"delete":true,"update":true},"settings":{"view":true,"create":true,"delete":true,"update":true},"dashboard":{"view":true,"create":true,"delete":true,"update":true},"inventory":{"view":true,"create":true,"delete":true,"update":true},"cash_register":{"view":true,"create":true,"delete":true,"update":true},"consultations":{"view":true,"create":true,"delete":true,"update":true},"practitioners":{"view":true,"create":true,"delete":true,"update":true},"prescriptions":{"view":true,"create":true,"delete":true,"update":true},"hospitalization":{"view":true,"create":true,"delete":true,"update":true}}'::jsonb, true, '2026-08-20T12:02:00.002Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('edf8dd67-f9be-4fac-a1b2-9226f83eb5e8', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'doctor@espoir.com', '$2a$10$eB3xwGhBPiWIvszSODaOSO8JsARtC9upbwgqFwFFODf4zaqs5eRqe', 'Amadou', 'Diallo', 'TENANT_USER', 'DOCTOR', '{"users":{"view":true,"create":false,"delete":false,"update":false},"agenda":{"view":true,"create":true,"delete":false,"update":true},"reports":{"view":true,"create":false,"delete":false,"update":false},"invoices":{"view":true,"create":false,"delete":false,"update":false},"patients":{"view":true,"create":true,"delete":false,"update":true},"settings":{"view":true,"create":false,"delete":false,"update":false},"dashboard":{"view":true,"create":true,"delete":false,"update":true},"inventory":{"view":true,"create":false,"delete":false,"update":false},"cash_register":{"view":true,"create":false,"delete":false,"update":false},"consultations":{"view":true,"create":true,"delete":false,"update":true},"practitioners":{"view":true,"create":false,"delete":false,"update":false},"prescriptions":{"view":true,"create":true,"delete":false,"update":true},"hospitalization":{"view":true,"create":false,"delete":false,"update":false}}'::jsonb, true, '2026-08-20T12:02:00.006Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('5628dcd1-7b2d-4c58-b9d0-3ffd0a56d159', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'secretaire@espoir.com', '$2a$10$eB3xwGhBPiWIvszSODaOSO8JsARtC9upbwgqFwFFODf4zaqs5eRqe', 'Mariama', 'Sow', 'TENANT_USER', 'SECRETARY', '{"users":{"view":true,"create":false,"delete":false,"update":false},"agenda":{"view":true,"create":true,"delete":false,"update":true},"reports":{"view":true,"create":false,"delete":false,"update":false},"invoices":{"view":true,"create":false,"delete":false,"update":false},"patients":{"view":true,"create":true,"delete":false,"update":true},"settings":{"view":true,"create":false,"delete":false,"update":false},"dashboard":{"view":true,"create":true,"delete":false,"update":true},"inventory":{"view":true,"create":false,"delete":false,"update":false},"cash_register":{"view":true,"create":false,"delete":false,"update":false},"consultations":{"view":true,"create":false,"delete":false,"update":false},"practitioners":{"view":true,"create":false,"delete":false,"update":false},"prescriptions":{"view":true,"create":false,"delete":false,"update":false},"hospitalization":{"view":true,"create":false,"delete":false,"update":false}}'::jsonb, true, '2026-08-20T12:02:00.007Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('dae3448e-a410-455c-887b-be02e89cfb21', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'caissier@espoir.com', '$2a$10$eB3xwGhBPiWIvszSODaOSO8JsARtC9upbwgqFwFFODf4zaqs5eRqe', 'Cheikh', 'Ndiaye', 'TENANT_USER', 'CASHIER', '{"users":{"view":true,"create":false,"delete":false,"update":false},"agenda":{"view":true,"create":false,"delete":false,"update":false},"reports":{"view":true,"create":false,"delete":false,"update":false},"invoices":{"view":true,"create":true,"delete":false,"update":true},"patients":{"view":true,"create":false,"delete":false,"update":false},"settings":{"view":true,"create":false,"delete":false,"update":false},"dashboard":{"view":true,"create":true,"delete":false,"update":true},"inventory":{"view":true,"create":false,"delete":false,"update":false},"cash_register":{"view":true,"create":true,"delete":false,"update":true},"consultations":{"view":true,"create":false,"delete":false,"update":false},"practitioners":{"view":true,"create":false,"delete":false,"update":false},"prescriptions":{"view":true,"create":false,"delete":false,"update":false},"hospitalization":{"view":true,"create":false,"delete":false,"update":false}}'::jsonb, true, '2026-08-20T12:02:00.007Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('9b2a95ed-3ca5-442b-8537-eebc11508bf1', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'pharmacist@espoir.com', '$2a$10$eB3xwGhBPiWIvszSODaOSO8JsARtC9upbwgqFwFFODf4zaqs5eRqe', 'Moussa', 'Fall', 'TENANT_USER', 'PHARMACIST', '{"users":{"view":true,"create":false,"delete":false,"update":false},"agenda":{"view":true,"create":false,"delete":false,"update":false},"reports":{"view":true,"create":false,"delete":false,"update":false},"invoices":{"view":true,"create":false,"delete":false,"update":false},"patients":{"view":true,"create":false,"delete":false,"update":false},"settings":{"view":true,"create":false,"delete":false,"update":false},"dashboard":{"view":true,"create":true,"delete":false,"update":true},"inventory":{"view":true,"create":true,"delete":false,"update":true},"cash_register":{"view":true,"create":false,"delete":false,"update":false},"consultations":{"view":true,"create":false,"delete":false,"update":false},"practitioners":{"view":true,"create":false,"delete":false,"update":false},"prescriptions":{"view":true,"create":true,"delete":false,"update":true},"hospitalization":{"view":true,"create":false,"delete":false,"update":false}}'::jsonb, true, '2026-08-20T12:02:00.008Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('dd9c09d1-2fd9-44a4-a74d-25c461d910ca', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'mbndiaye@gmail.com', '$2a$10$rST1vZ0mLFuo1gBBaR9VruQJ96od/zCWlEqvbSgaHftPavlM.NKra', 'Mame Mbaye', 'NDIAYE', 'SUPER_ADMIN_SAAS', 'SUPER_ADMIN_SAAS', '{"users":{"view":true,"create":true,"delete":true,"update":true},"agenda":{"view":true,"create":true,"delete":true,"update":true},"reports":{"view":true,"create":true,"delete":true,"update":true},"invoices":{"view":true,"create":true,"delete":true,"update":true},"patients":{"view":true,"create":true,"delete":true,"update":true},"settings":{"view":true,"create":true,"delete":true,"update":true},"dashboard":{"view":true,"create":true,"delete":true,"update":true},"inventory":{"view":true,"create":true,"delete":true,"update":true},"cash_register":{"view":true,"create":true,"delete":true,"update":true},"consultations":{"view":true,"create":true,"delete":true,"update":true},"practitioners":{"view":true,"create":true,"delete":true,"update":true},"prescriptions":{"view":true,"create":true,"delete":true,"update":true},"hospitalization":{"view":true,"create":true,"delete":true,"update":true}}'::jsonb, true, '2026-08-20T12:28:56.322Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('3eebc1a5-0028-4f6c-8d9c-7b129da606fe', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'admin@test-dpi-1787398551002.sn', '$2a$10$vR05lK.EH.70QDxzdlnuFOMPEJWeROkxaMoMLVYbxx3vszOVCRVC.', 'Mamadou', 'Ndiaye', 'TENANT_ADMIN', 'ADMIN', '{}'::jsonb, true, '2026-08-22T11:35:51.157Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('c5167084-94ea-45c4-be11-2bb3594fe8dd', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'admin.horizon@gmail.com', '$2a$10$NWiqLqNtGJqK2bne/uxiPOKYeq5byNKkqKWuVQLn5c/AhTjb74yIa', 'Abdoulaye', 'Ba', 'SUPER_ADMIN', 'CUSTOM', '{}'::jsonb, true, '2026-08-22T13:39:51.945Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active, created_at)
VALUES ('f80c01ff-661d-44d3-9b6a-3d00816d7917', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'bserigne@sst.best', '$2a$10$Q5NFMGOPNU0Pb52r/nfrg.3AkmKr3zXlHYpv9Xdo4BJNLYpr0s2d2', 'Baye Serigne', 'NDIAYE', 'SUPER_ADMIN_SAAS', 'SUPER_ADMIN_SAAS', '{"users":{"view":true,"create":false,"delete":false,"update":false},"agenda":{"view":true,"create":true,"delete":true,"update":true},"reports":{"view":true,"create":false,"delete":false,"update":false},"invoices":{"view":true,"create":false,"delete":false,"update":false},"patients":{"view":true,"create":false,"delete":false,"update":false},"settings":{"view":true,"create":false,"delete":false,"update":false},"dashboard":{"view":false,"create":false,"delete":false,"update":false},"inventory":{"view":true,"create":false,"delete":false,"update":false},"cash_register":{"view":true,"create":false,"delete":false,"update":false},"consultations":{"view":true,"create":false,"delete":false,"update":false},"practitioners":{"view":true,"create":true,"delete":false,"update":true},"prescriptions":{"view":true,"create":false,"delete":false,"update":false},"hospitalization":{"view":true,"create":false,"delete":false,"update":false}}'::jsonb, true, '2026-08-22T18:58:29.408Z')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, permissions = EXCLUDED.permissions;

-- 5. MEDICAL SERVICES & TARIFS (13)
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('1651768c-961b-4970-a8b7-583d9f30788d', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'NFS-BIO', 'Bilan Sanguin NFS & Glycémie', 'ANALYSE', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('9e0d56d7-f4d7-4750-b6f2-d1da04ca3c51', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'ECHO-ABD', 'Échographie Abdomino-Pelvienne', 'ANALYSE', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('4674304e-d519-4f0a-b05b-45631e542a78', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'CS-GEN', 'Consultation Générale', 'CONSULTATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('df40b45a-ddb6-4d92-8f07-1d5843eccf68', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'CS-GEN', 'Consultation Générale', 'CONSULTATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('c9ef95e8-f3d8-4958-b2c9-725a28f93ed8', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'CONS-GEN', 'Consultation Médecine Générale', 'CONSULTATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('1aad3b02-c10f-43fe-b8ab-224352bc48c3', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'CONS-PED', 'Consultation Pédiatrique', 'CONSULTATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('006ffceb-a781-4ccb-9276-8d49dfb39f9d', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'CONS-SPEC', 'Consultation Spécialiste', 'CONSULTATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('5dcf0ed0-7558-4f16-97ad-b26587071977', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'HOSP-01', 'Séjour Hospitalier (Frais d''hébergement / Journée)', 'HOSPITALISATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('082321ca-6b14-43eb-b91e-a51b2c2bd19e', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'HOSP-01', 'Séjour Hospitalier (Frais d''hébergement / Journée)', 'HOSPITALISATION', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('13a2d231-e20b-4793-9e9d-369045d8f889', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'INJ-IV', 'Injection Intraveineuse (IV / IM)', 'SOIN', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('a3e9dba3-db64-4ad3-824f-b781b67b2d22', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'PERF-SANG', 'Analyse sanguine', 'TRAITEMENT', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('721576fc-e77c-4591-90c7-1dcaaa0ad66f', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'PANSM-COMP', 'Pansement Complexe & Soins', 'TRAITEMENT', 0, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO medical_services (id, tenant_id, code, name, category, standard_fee, is_active)
VALUES ('7a0fef15-4cda-491e-84a7-3924b8fdbd76', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'PERF-SANG', 'Perfusion Sanguine', 'TRAITEMENT', 0, true)
ON CONFLICT (id) DO NOTHING;

-- 6. INSURANCE COMPANIES & IPM (14)
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('2631a97f-3ae5-44ba-8d83-956846e76bd3', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'Allianz Sénégal', 'ALLIANZ-SN', '+221338898989', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('37ead72d-74cc-41e3-a8b8-ddeec2304a1f', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'Allianz Sénégal', 'ALLIANZ-SN', '+221338898989', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('aecf98e4-8b4a-4afc-82f3-bafe1130af42', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'Allianz Sénégal', 'ALLIANZ-SN', '+22133+2213345678958898989', 'mamembayendiaye2022@gmail.com', '5564 Av Leopold SENGHOR', 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('ff1eeb8c-4563-46be-ab45-34614d39e0ed', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'AXA Assurances', 'AXA-SN', '+221338493434', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('c11463e9-2492-41cf-becb-b2d9c62b0792', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'AXA Assurances', 'AXA-SN', '+221338493434', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('4963809f-9c7b-4ad2-b617-b850e2f57ef2', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'AXA Assurances', 'AXA-SN', '+221338493434', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('663ad5d7-a4ac-4d38-8a7b-6c3a3c43a88c', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'GMC Assurances / IPM', 'GMC-SN', '+221338234567', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('307a9dd2-33fd-47cc-95d9-4e22b6b5bee1', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'GMC Assurances / IPM', 'GMC-SN', '+221338234567', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('79fcf0cb-8ab3-41ce-b653-7650531b1604', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'GMC Assurances / IPM', 'GMC-SN', '+221338234567', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('0f0bae58-f79f-4ee7-bf20-558e10fd4453', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'IPM CSS', 'CSS', '+221776549809', 'ipm@css.sn', '54 Av Lamine GUEYE', 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('df247493-fc30-485c-b069-bd707d97e7ee', '10b0e5e8-1bca-4260-b883-0ab3066fac56', 'IPM SONATEL', 'IPM-SONATEL', '+221338391200', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('c440e9bc-cf1d-4b2e-a6e6-30e3560cfc52', '854246a0-392a-475c-b0db-b34b5cc4dfe7', 'IPM SONATEL', 'IPM-SONATEL', '+221338391200', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('5a57a941-717a-4c5e-a182-2765026726ef', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'IPM SONATEL', 'IPM-SONATEL', '+221338391200', NULL, NULL, 30, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO insurance_companies (id, tenant_id, name, code, contact_phone, contact_email, address, payment_terms_days, is_active)
VALUES ('4ab09b89-f34c-4974-aa39-14b0ea5a23ae', 'ae405816-e93b-4d99-a25f-d1c5745bb896', 'IPM SONATEL', 'IPM-SONATEL', '+221338390000', 'contact@ipmsonatel.sn', NULL, 30, true)
ON CONFLICT (id) DO NOTHING;

-- 8. BUILDINGS (2)
INSERT INTO hospital_buildings (id, tenant_id, name, code, is_active)
VALUES ('430c7393-171b-4be0-9531-10b4049c8d96', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'Pavillon A', 'PAV-A', true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO hospital_buildings (id, tenant_id, name, code, is_active)
VALUES ('503bf2dd-8dbb-4c2a-909b-4026a626a655', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'Pavillon B', 'PAV-B', true)
ON CONFLICT (id) DO NOTHING;

-- 9. SMTP ACCOUNTS (1)
INSERT INTO tenant_smtp_accounts (id, tenant_id, account_name, from_name, from_email, reply_to_email, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_password, is_default, is_active)
VALUES ('75543e7e-251b-484b-a3ba-414e8d1f1997', '96a5b7a6-f067-4ec2-a28b-54fdcd47f013', 'Facturation', 'Clinique de la paix', 'mbndiaye@sst.best', NULL, 'ssl0.ovh.net', 465, true, 'mbndiaye@sst.best', 'SesameOubi+1959', true, true)
ON CONFLICT (id) DO NOTHING;

RESET app.bypass_rls;
