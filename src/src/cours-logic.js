import { db } from "./firebase.js";
import { collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const grid = document.getElementById('courses-grid');

// On récupère uniquement les articles dont la catégorie contient "Cours"
onSnapshot(query(collection(db, "articles"), orderBy("createdAt", "desc")), (snap) => {
    const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    grid.innerHTML = all.map(course => `
        <div class="course-card bg-white rounded-[2.5rem] shadow-sm border overflow-hidden transition-all duration-500 cursor-pointer" onclick="location.href='article.html?id=${course.id}'">
            <div class="h-56 relative">
                <img src="${course.image || 'https://via.placeholder.com/400x300'}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/20"></div>
                <span class="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    ${course.category}
                </span>
            </div>
            <div class="p-8">
                <h3 class="text-xl font-black text-slate-800 leading-tight mb-4">${course.title}</h3>
                <div class="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dossier Complet</span>
                    <i class="fas fa-chevron-right text-blue-600"></i>
                </div>
            </div>
        </div>
    `).join('');
});