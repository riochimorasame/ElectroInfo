import { db } from "./firebase.js";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const form = document.getElementById('articleForm');
const submitBtn = document.getElementById('submit-btn');
let currentEditId = null;

form.onsubmit = async (e) => {
    e.preventDefault();
    const type = document.getElementById('postType').value;
    const content = type === 'cours' ? document.getElementById('fileLink').value : document.getElementById('fullContentHTML').value;

    const data = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        image: document.getElementById('mainImage').value,
        type: type, 
        fullContent: content,
        updatedAt: serverTimestamp()
    };

    try {
        if (currentEditId) {
            await updateDoc(doc(db, "articles", currentEditId), data);
            alert("Mise à jour réussie Monsieur Djone !");
            currentEditId = null;
            submitBtn.innerText = "Publier la ressource";
            submitBtn.className = "w-full bg-blue-600 text-white p-6 rounded-3xl font-black uppercase shadow-xl";
        } else {
            data.createdAt = serverTimestamp();
            await addDoc(collection(db, "articles"), data);
            alert("Nouvelle ressource ajoutée !");
        }
        form.reset();
        document.getElementById('live-preview').innerHTML = "";
    } catch (err) { alert("Erreur : " + err); }
};

window.editItem = async (id) => {
    const snap = await getDoc(doc(db, "articles", id));
    if (snap.exists()) {
        const item = snap.data();
        currentEditId = id;
        document.getElementById('title').value = item.title;
        document.getElementById('category').value = item.category;
        document.getElementById('mainImage').value = item.image;
        window.switchTab(item.type);
        if (item.type === 'cours') document.getElementById('fileLink').value = item.fullContent;
        else document.getElementById('fullContentHTML').value = item.fullContent;
        
        submitBtn.innerText = "Enregistrer les modifications";
        submitBtn.className = "w-full bg-orange-600 text-white p-6 rounded-3xl font-black uppercase shadow-xl";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

onSnapshot(query(collection(db, "articles"), orderBy("createdAt", "desc")), (snap) => {
    const list = document.getElementById('articlesAdminList');
    list.innerHTML = snap.docs.map(doc => {
        const item = doc.data();
        return `
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-start mb-4">
                <span class="text-[9px] font-black uppercase px-3 py-1 bg-slate-100 rounded-full">${item.type}</span>
                <button onclick="deleteItem('${doc.id}')" class="text-slate-300 hover:text-red-500"><i class="fas fa-trash-alt"></i></button>
            </div>
            <h4 class="font-bold text-slate-800 mb-4">${item.title}</h4>
            <button onclick="editItem('${doc.id}')" class="w-full text-[10px] font-black uppercase p-2 bg-blue-50 text-blue-600 rounded-lg">Modifier</button>
        </div>`;
    }).join('');
});

window.deleteItem = async (id) => { if(confirm("Supprimer ?")) await deleteDoc(doc(db, "articles", id)); };