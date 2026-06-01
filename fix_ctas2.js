const fs = require('fs');
const path = require('path');

function replaceCTA(filepath, btnText) {
    const fullPath = path.join(__dirname, filepath);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Look for <div class="cta-form" ...
    const startIdx = content.indexOf('<div class="cta-form"');
    if (startIdx === -1) {
        console.log(`No cta-form found in ${filepath}`);
        return;
    }
    
    // Look for <p class="cta-note">
    const noteIdx = content.indexOf('<p class="cta-note">', startIdx);
    if (noteIdx === -1) {
        console.log(`No cta-note found in ${filepath}`);
        return;
    }
    
    // Find the end of the p tag
    const endIdx = content.indexOf('</p>', noteIdx) + 4;
    
    const replacement = `<div style="margin-top: 2rem;">
            <a href="../signup/index.html" class="btn-hero-primary" style="font-size: 1.125rem; padding: 1.125rem 2.5rem; text-align: center; display: inline-block;">${btnText}</a>
          </div>`;
          
    const newContent = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log(`Successfully updated ${filepath}`);
}

replaceCTA("crowdfunding/index.html", "Lancer votre collecte maintenant");
replaceCTA("private-ticketing/index.html", "Créer votre événement maintenant");
replaceCTA("tukio-pass/private.html", "Créer votre Tukio Pass maintenant");
replaceCTA("index.html", "Démarrer maintenant");
