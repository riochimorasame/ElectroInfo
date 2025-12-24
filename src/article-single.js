import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // --- LA LOGIQUE DE REDIRECTION MONSIEUR DJONE ---
        // Si c'est un cours et que le contenu ressemble à un chemin de fichier
        if (data.type === 'cours' && (data.fullContent.includes('/') || data.fullContent.endsWith('.html') || data.fullContent.endsWith('.pdf'))) {
            window.location.replace(data.fullContent); 
            // Cela redirige immédiatement vers votre fichier sans afficher cette page vide
        } else {
            // Sinon, on affiche l'article normalement (votre code actuel)
            document.getElementById('article-title').innerText = data.title;
            document.getElementById('article-content').innerHTML = data.fullContent;
            // ... reste de votre code d'affichage
        }
    }
}