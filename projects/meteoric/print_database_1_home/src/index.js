import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs, getDoc, onSnapshot,
	addDoc, deleteDoc, doc, ref, set, updateDoc, setDoc,
	deleteField
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyB7-_7m3DxutYZGaVoxJbMqjyVvMc4riXo",  
	authDomain: "databasedisplay.firebaseapp.com",  
	projectId: "databasedisplay",  
	storageBucket: "databasedisplay.firebasestorage.app",  
	messagingSenderId: "1062120311778",  
	appId: "1:1062120311778:web:f3c4025c9407ce1f1047bb"  
  };
  

initializeApp(firebaseConfig)

const db = getFirestore()

const newFormButton = document.getElementById("newFormButton")
newFormButton.onclick = async function newForm() {
	const docRef = await addDoc(collection(db, "formData"), {
		rows: 5,
		columns: 1,
	});

	const testCollection = collection(db, "formData", docRef.id, "userData");
	addDoc(testCollection, { title: "hello"})

	const newFormLink = document.getElementById("newFormLink")
	newFormLink.href = window.location.pathname + "?link=" + docRef.id
	newFormLink.href = "../../print_database_1/public/index.html" + "?link=" + docRef.id

	document.getElementById("goToForm").style.display = ""
}
