import os
from PIL import Image

uploaded_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\3fe161dd-6662-4833-acb3-a23dd5329f84\.user_uploaded"
files = sorted([os.path.join(uploaded_dir, f) for f in os.listdir(uploaded_dir) if f.endswith(('.png', '.jpg', '.jpeg'))], key=os.path.getmtime)

print("Recent uploaded files:")
for f in files[-4:]:
    img = Image.open(f)
    print(f, img.size, img.mode)

# Let's copy the full SoftMed logo and square SoftMed logo to project
# The last 2 images uploaded by user:
sm_square_src = files[-4]
sm_full_src = files[-3]

print("SM Square source:", sm_square_src)
print("SM Full source:", sm_full_src)

# Process SoftMed Full logo
img_full = Image.open(sm_full_src)
# Ensure clean RGBA or RGB
img_full.save(r"c:\softrv\logo_softmed_official.png")
print("[OK] Saved logo_softmed_official.png", img_full.size)

# Process SoftMed Square logo
img_sq = Image.open(sm_square_src)
img_sq.save(r"c:\softrv\logo_softmed_square.png")
print("[OK] Saved logo_softmed_square.png", img_sq.size)

# Process SST Logo
sst_src = r"c:\softrv\LogoSST300.png"
if not os.path.exists(sst_src):
    sst_src = r"c:\softrv\LOGO SST 500.jpg"

img_sst = Image.open(sst_src)
print("SST Logo source:", sst_src, img_sst.size, img_sst.mode)

# If SST logo has white background, let's keep it crisp or make transparent if needed
# Let's save a clean SST logo
img_sst.save(r"c:\softrv\logo_sst_clean.png")
print("[OK] Saved logo_sst_clean.png", img_sst.size)
