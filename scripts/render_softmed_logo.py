import os
from PIL import Image, ImageDraw, ImageFont

def create_softmed_logo():
    width, height = 800, 240
    # Transparent background image
    img = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    # Colors
    c_navy = (13, 43, 69, 255)       # #0D2B45
    c_blue = (37, 99, 235, 255)      # #2563EB
    c_cyan = (74, 144, 226, 255)     # #4A90E2
    c_dark = (30, 41, 59, 255)       # #1E293B
    c_green = (16, 185, 129, 255)    # #10B981

    # 1. Draw Caduceus / Medical Icon Circle
    cx, cy, r = 110, 120, 85
    # Outer circle gradient-like thickness
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c_navy, width=10)

    # Stethoscope/Snake Curves inside
    # Curve 1
    draw.arc([cx - 50, cy - 60, cx + 50, cy + 40], start=180, end=360, fill=c_blue, width=8)
    draw.arc([cx - 40, cy - 20, cx + 40, cy + 60], start=0, end=180, fill=c_blue, width=8)

    # Medical Pulse Line in the center (ECG)
    pulse_points = [
        (cx - 55, cy),
        (cx - 30, cy),
        (cx - 20, cy - 25),
        (cx - 5, cy + 30),
        (cx + 10, cy - 40),
        (cx + 25, cy + 20),
        (cx + 35, cy),
        (cx + 55, cy)
    ]
    draw.line(pulse_points, fill=c_cyan, width=6, joint="curve")

    # Center Medical Cross Accent
    draw.line([cx, cy + 50, cx, cy + 70], fill=c_navy, width=8)
    draw.line([cx - 10, cy + 60, cx + 10, cy + 60], fill=c_navy, width=8)

    # 2. Typography: "SoftMed"
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 86)
        font_sub = ImageFont.truetype("arial.ttf", 26)
        font_badge = ImageFont.truetype("arialbd.ttf", 22)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # Draw "Soft"
    draw.text((230, 60), "Soft", fill=c_navy, font=font_title)
    # Draw "Med"
    draw.text((410, 60), "Med", fill=c_blue, font=font_title)

    # Draw Badge "ENTERPRISE"
    draw.rounded_rectangle([615, 75, 785, 115], radius=8, fill=c_blue)
    draw.text((630, 82), "ENTERPRISE", fill=(255, 255, 255, 255), font=font_badge)

    # Draw Subtitle
    draw.text((235, 160), "Système Intégré de Gestion Médicale & Hospitalière", fill=(100, 116, 139, 255), font=font_sub)

    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "logo_softmed.png")
    img.save(output_path, "PNG")
    print(f"[OK] Logo SoftMed saved at: {output_path}")

    # Also save in project root for easy reference
    img.save(os.path.join(os.path.dirname(__file__), "..", "logo_softmed.png"), "PNG")

create_softmed_logo()
