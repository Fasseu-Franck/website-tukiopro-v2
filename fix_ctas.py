import os
import re

html_files = [
    "billetterie/index.html",
    "corporate-ticketing/index.html",
    "crowdfunding/index.html",
    "e-voting/index.html",
    "private-ticketing/index.html",
    "tukio-pass/index.html",
    "tukio-pass/corporate.html",
    "tukio-pass/private.html"
]

btn_texts = {
    "billetterie/index.html": "Démarrer votre billetterie maintenant",
    "corporate-ticketing/index.html": "Démarrer maintenant",
    "crowdfunding/index.html": "Lancer votre collecte maintenant",
    "e-voting/index.html": "Lancer votre vote maintenant",
    "private-ticketing/index.html": "Créer votre événement maintenant",
    "tukio-pass/index.html": "Créer votre Tukio Pass maintenant",
    "tukio-pass/corporate.html": "Créer votre Tukio Pass maintenant",
    "tukio-pass/private.html": "Créer votre Tukio Pass maintenant"
}

for filepath in html_files:
    if not os.path.exists(filepath):
        print(f"Not found: {filepath}")
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # We want to replace the div.cta-form and the p.cta-note that follows it.
    # Pattern to match <div class="cta-form" ...> ... </div> \s* <p class="cta-note">...</p>
    pattern = re.compile(r'<div class="cta-form".*?</div>\s*<p class="cta-note">.*?</p>', re.DOTALL)
    
    btn_text = btn_texts.get(filepath, "Démarrer maintenant")
    
    replacement = f'''<div style="margin-top: 2rem;">
            <a href="../signup/index.html" class="btn-hero-primary" style="font-size: 1.125rem; padding: 1.125rem 2.5rem; text-align: center; display: inline-block;">{btn_text}</a>
          </div>'''
          
    new_content, count = pattern.subn(replacement, content)
    
    if count > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {filepath} ({count} replacements)")
    else:
        print(f"No match found in {filepath}")
