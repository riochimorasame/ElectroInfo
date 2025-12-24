import { auth, db } from "./firebase.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    updatePassword, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Inscription
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            role: "user",
            createdAt: new Date()
        });
        alert("Compte créé avec succès !");
        window.location.href = "index.html";
    } catch (error) {
        alert("Erreur : " + error.message);
    }
}

// Connexion
export async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "index.html";
    } catch (error) {
        alert("Erreur : " + error.message);
    }
}

// Déconnexion
export async function logout() {
    await signOut(auth);
    window.location.href = "login.html";
}

// Vérifier l'état
export function checkAuthStatus(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

// Mot de passe oublié
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email de réinitialisation envoyé !");
    } catch (error) {
        alert("Erreur : " + error.message);
    }
}

// Changer mot de passe
export async function changeUserPassword(user, newPassword) {
    try {
        await updatePassword(user, newPassword);
    } catch (error) {
        throw error;
    }
}

// Mise à jour Profil (Nom + Photo)
export async function updateUserProfile(user, displayName, photoURL) {
    try {
        await updateProfile(user, { displayName: displayName, photoURL: photoURL });
        await updateDoc(doc(db, "users", user.uid), { displayName: displayName, photoURL: photoURL });
    } catch (error) {
        throw error;
    }
}