# create_blog_structure.py
import os

countries = ['FI', 'IE', 'EE', 'SE', 'LV', 'LT', 'NL', 'PL', 'DK', 'DE', 
             'RO', 'AT', 'BE', 'FR', 'SI', 'CZ', 'HU', 'PT', 'IT', 'BG',
             'LU', 'SK', 'CY', 'EL', 'ES', 'HR', 'MT']

blog_dir = 'static/blog'

for country in countries:
    country_dir = os.path.join(blog_dir, country)
    os.makedirs(os.path.join(country_dir, 'images'), exist_ok=True)
    os.makedirs(os.path.join(country_dir, 'flag'), exist_ok=True)
    
    # Create template content.txt
    content_path = os.path.join(country_dir, 'content.txt')
    if not os.path.exists(content_path):
        with open(content_path, 'w', encoding='utf-8') as f:
            f.write(f"""TITLE: {country} Peatland Conservation Strategy
SUBTITLE: A Comprehensive Analysis
AUTHOR: Environmental Research Team
DATE: February 2026
READ_TIME: 8 min
HERO_IMAGE: hero.jpg

SECTION: Executive Summary
ICON: 🌿
Add your executive summary content here.

SECTION: Key Statistics
ICON: 📊
Add your statistics section here.

HIGHLIGHT: Important Note
Add highlighted information here.

LIST: Key Points
- Point 1
- Point 2
- Point 3

SECTION: Conclusion
ICON: 📚
Add your conclusion here.
""")

print("Blog structure created successfully!")