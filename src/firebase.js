// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()

// Получение расходов
async function getExpenses() {
    const user = auth.currentUser
    if (!user) return

    const q = query(
        collection(db, 'expenses'),
        where('uid', '==', user.uid) //  фильтрация по UID
    )
    let expenses = [];
    const snapshot = await getDocs(q)
    expenses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return expenses

}

// Добавление нового расхода
async function addExpense(expense) {
    await addDoc(collection(db, "expenses"), {
        ...expense,
        date: expense.date || new Date().toISOString().split("T")[0], // Дата по умолчанию
        uid: auth.currentUser.uid
    });
}

// Удаление расхода
async function deleteExpense(id) {
    await deleteDoc(doc(db, "expenses", id));
}

// Обновление расхода
async function updateExpense(id, updatedData) {
    await updateDoc(doc(db, "expenses", id), updatedData);
}

export { db, getExpenses, addExpense, deleteExpense, updateExpense };


