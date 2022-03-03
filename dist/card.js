import{
     initializeApp 
}from '../node_modules/firebase/app'

import{
  getFirestore, collection, getDocs
} from '../node_modules/firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZQhVb2pn-m2Z4RzTPizRBlZCdqL6bcvo",
  authDomain: "infocards-71e92.firebaseapp.com",
  projectId: "infocards-71e92",
  storageBucket: "infocards-71e92.appspot.com",
  messagingSenderId: "943364574192",
  appId: "1:943364574192:web:c68d516ba528285bc12b35"
};

//init firebase app
initializeApp(firebaseConfig)

//init firestore
const db = getFirestore()

//collection ref
const colRef = collection(db, 'cards')
  
  document.querySelector("#closeBox").addEventListener('click', function(event){
    // document.querySelector('.box').style.display = 'none'
    // console.log("hel")
    location.href = '../index.html'
  })