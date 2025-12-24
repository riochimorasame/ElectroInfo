import { db } from "./firebase.js";
import { collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const grid = document.getElementById('courses-grid');

onSnapshot(query(collection(db, "articles"), where("type", "==", "cours"), orderBy("createdAt", "desc")), (snap) => {
    grid.innerHTML = snap.docs.map(doc => {
        const c = doc.data();
        const link = c.fullContent; // ex: cours/schema.html
        const isPdf = link.endsWith('.pdf');
        
        return `
        <div class="bg-white rounded-[2.5rem] shadow-sm border overflow-hidden hover:shadow-xl transition-all cursor-pointer group" 
             onclick="window.open('${link}', '_blank')">
            <div class="h-48 relative overflow-hidden">
                <img src="${c.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                <div class="absolute top-4 right-4 bg-white/90 p-3 rounded-xl shadow-lg">
                    <i class="fas ${isPdf ? 'fa-file-pdf text-red-600' : 'fa-file-code text-blue-600'} text-xl"></i>
                </div>
            </div>
            <div class="p-6">
                <span class="text-[10px] font-black text-blue-600 uppercase">${c.category}</span>
                <h3 class="text-lg font-black text-slate-800 mt-2">${c.title}</h3>
                <p class="text-[10px] font-bold text-slate-400 mt-4 uppercase italic">Cliquer pour ouvrir <i class="fas fa-external-link-alt ml-1"></i></p>
            </div>
        </div>`;
    }).join('');
});