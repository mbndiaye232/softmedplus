import os
from PIL import Image

src = r"C:\Users\hp\.gemini\antigravity-ide\brain\3fe161dd-6662-4833-acb3-a23dd5329f84\.user_uploaded\media_1787507199886.png"
img = Image.open(src)
print("SST Official uploaded logo:", img.size, img.mode)

# Save high-res clean PNG
img.save(r"c:\softrv\logo_sst_clean.png", "PNG")
img.save(r"c:\softrv\public\logo_sst_clean.png", "PNG")

print("[OK] Saved authentic SST logo to logo_sst_clean.png")
