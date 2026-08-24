import os
from PIL import Image

# 1. SoftMed Official Logo (from media_1787504381338.jpg)
sm_src = r"c:\softrv\logo_softmed_official.png"
img_sm = Image.open(sm_src).convert("RGBA")

# Ensure crisp square
w, h = img_sm.size
print("SoftMed size:", w, h)

# Save high-res PNG
img_sm.save(r"c:\softrv\logo_softmed_clean.png", "PNG")

# 2. SST Logo (from LogoSST300.png or LOGO SST 500.jpg)
sst_src = r"c:\softrv\LOGO SST 500.jpg"
if not os.path.exists(sst_src):
    sst_src = r"c:\softrv\LogoSST300.png"

img_sst = Image.open(sst_src).convert("RGBA")
# Check SST size and aspect ratio
sw, sh = img_sst.size
print("SST original size:", sw, sh, "Aspect Ratio:", sw / sh)

# If SST is rectangular or oval, let's preserve its exact aspect ratio
img_sst.save(r"c:\softrv\logo_sst_clean.png", "PNG")

print("[OK] Prepared high-res brand logos with preserved aspect ratios.")
