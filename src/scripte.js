import { db } from "./firebase.js";
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

let allArticles = [], currentCategory = "Tout", currentSlide = 0;

// SLIDER
onSnapshot(collection(db, "ads"), (snap) => {
    const ads = snap.docs.map(d => d.data());
    const track = document.getElementById('slider-track');
    const dots = document.getElementById('slider-dots');
    if(!track || ads.length === 0) return;

    track.innerHTML = ads.map(ad => `<div class="min-w-full h-full relative"><img src="${ad.image}" class="w-full h-full object-cover opacity-40"><div class="absolute inset-0 flex items-center px-12 text-white font-black text-5xl uppercase italic">${ad.title}</div></div>`).join('');
    dots.innerHTML = ads.map((_, i) => `<div class="dot w-2 h-2 rounded-full bg-white/30 transition-all ${i===0?'bg-blue-600 w-8':''}"></div>`).join('');
    
    setInterval(() => {
        if(ads.length <= 1) return;
        currentSlide = (currentSlide + 1) % ads.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) => d.className = `dot w-2 h-2 rounded-full transition-all ${i===currentSlide?'bg-blue-600 w-8':'bg-white/30'}`);
    }, 6000);
});

// ARTICLES
onSnapshot(query(collection(db, "articles"), orderBy("createdAt", "desc")), (snap) => {
    allArticles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderMenu(); renderPortal();
});

function renderMenu() {
    const cats = ["Tout", ...new Set(allArticles.map(a => a.category))];
    document.getElementById('nav-cats').innerHTML = cats.map(c => `<button onclick="window.setCategory('${c}')" class="w-full text-left p-4 rounded-xl font-bold ${currentCategory===c?'bg-blue-50 text-blue-600':'text-slate-500'}">${c}</button>`).join('');
}

window.setCategory = (c) => { currentCategory = c; document.getElementById('current-cat-label').innerText = c; renderPortal(); };

function renderPortal() {
    const filtered = allArticles.filter(a => (currentCategory === "Tout" || a.category === currentCategory));
    document.getElementById('articles-container').innerHTML = filtered.map(a => `
        <article class="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group" onclick="location.href='article.html?id=${a.id}'">
            <div class="h-60 overflow-hidden relative"><img src="${a.image}" class="w-full h-full object-cover group-hover:scale-110 duration-700"></div>
            <div class="p-8"><h3 class="font-black text-xl">${a.title}</h3><p class="text-blue-600 text-[10px] font-black mt-2 uppercase">Dossier Technique</p></div>
        </article>`).join('');
}