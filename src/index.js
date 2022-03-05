import{ initializeApp }from 'firebase/app'
import{
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, getDoc, doc,
  onSnapshot
  
} from 'firebase/firestore'


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

// get collection data
let cards = []
getDocs(colRef)
  .then(function(snapshot){
    // let cards = []
    snapshot.docs.forEach(function(doc){
      cards.push({ ...doc.data(), id:doc.id })
    })
    console.log(cards)
    cards.forEach(function(event){
      var place = document.createElement('div')
      var card = document.createElement('div')
      var picture = document.createElement('img')
      var bod = document.createElement('div')
      var names = document.createElement('h4')
      var description = document.createElement('p')
      var docId = document.createElement('p')
      //add class
      place.classList.add('col-sm-10', 'col-md-4', 'col-lg-3', 'col-xl-2')
      card.classList.add('card')
      picture.classList.add('card-img-top', 'col-xl-4')
      bod.classList.add('card-body')
      names.classList.add('card-title')
      description.classList.add('card-text')
      docId.style.display = 'none'
     
      //insert info
      picture.src = event.imgurl
      names.innerHTML = event.name
      description.innerHTML = event.shortdescription
      docId.innerHTML = event.id
      //construct card
      bod.appendChild(names)
      bod.appendChild(description)
      bod.appendChild(docId)
      card.appendChild(picture)
      card.appendChild(bod)
      place.appendChild(card)
      document.querySelector('.row').appendChild(place)
      
      
      document.querySelectorAll('.card').forEach(function(card){
        card.addEventListener('click',function(thing){
          
          // location.href = 'cards/card.html'
          // console.log(thing.target.nextElementSibling.children[0].innerHTML)
          const cardTitle = document.querySelector("#title")
          const cardDesc = document.querySelector("#shortdescription")
          const cardNotes = document.querySelector("#notes")
          const currentDoc = thing.target.nextElementSibling.children[2].innerHTML
          const docRef = doc(db, 'cards', currentDoc)
          onSnapshot(docRef, (doc) => {
            console.log(doc.data().name)
            console.log(doc.data().shortdescription)
            console.log(doc.data().notes)
          })
        })
      })
    })
    
  })
  .catch(err => {
    console.log(err.message)
  })
  

  
  //add a card
  const addCardForm = document.querySelector('.add')
  addCardForm.addEventListener('submit',(e) => {
    e.preventDefault()
    addDoc(colRef, {
      name: addCardForm.name.value,
      shortdescription: addCardForm.shortdescription.value,
      notes: " ",
      imgurl: addCardForm.imgurl.value,
    })
    .then(() =>{
      addCardForm.reset()
      location.href = '../index.html'
    })
  })
  
  document.querySelector('#create').addEventListener('click',function(){
    console.log('ell')
    location.href = 'cards/add.html'
  })
  
  document.querySelector("#closeBox").addEventListener('click', function(event){
    // document.querySelector('.box').style.display = 'none'
    // console.log("hel")
    location.href = '../index.html'
  })
  


  
  
 
  
  

  
   
  



 
 
 
