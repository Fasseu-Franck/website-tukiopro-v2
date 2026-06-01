const fs = require('fs');
const path = require('path');

const htmlFiles = [
    "billetterie/index.html",
    "corporate-ticketing/index.html",
    "crowdfunding/index.html",
    "e-voting/index.html",
    "private-ticketing/index.html",
    "tukio-pass/index.html",
    "tukio-pass/corporate.html",
    "tukio-pass/private.html"
];

const btnTexts = {
    "billetterie/index.html": "Démarrer votre billetterie maintenant",
    "corporate-ticketing/index.html": "Démarrer maintenant",
    "crowdfunding/index.html": "Lancer votre collecte maintenant",
    "e-voting/index.html": "Lancer votre vote maintenant",
    "private-ticketing/index.html": "Créer votre événement maintenant",
    "tukio-pass/index.html": "Créer votre Tukio Pass maintenant",
    "tukio-pass/corporate.html": "Créer votre Tukio Pass maintenant",
    "tukio-pass/private.html": "Créer votre Tukio Pass maintenant"
};

htmlFiles.forEach(filepath => {
    const fullPath = path.join(__dirname, filepath);
    if (!fs.existsSync(fullPath)) {
        console.log(`Not found: ${filepath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace <div class="cta-form"...>...</div><p class="cta-note">...</p>
    // Note: [\s\S] matches across newlines
    const regex = /<div class="cta-form"[\s\S]*?<\/div>\s*<p class="cta-note">.*?<\/p>/;
    
    const btnText = btnTexts[filepath] || "Démarrer maintenant";
    const replacement = `<div style="margin-top: 2rem;">
            <a href="../signup/index.html" class="btn-hero-primary" style="font-size: 1.125rem; padding: 1.125rem 2.5rem; text-align: center; display: inline-block;">${btnText}</a>
          </div>`;
          
    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${filepath}`);
    } else {
        console.log(`No match found in ${filepath}`);
    }
});
