import{ initializeApp }from 'firebase/app'
import{
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, getDoc, doc,
  onSnapshot, updateDoc
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
      place.classList.add('col-sm-10', 'col-md-5', 'col-lg-4', 'col-xl-3', event.id)
      card.classList.add('card')
      picture.classList.add('card-img-top', 'col-xl-3')
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
      
        place.addEventListener('click',function(thing){
          console.log(thing)
          // var targetCard = thing.path[1]
          document.querySelector('.box').style.display ='block'
          // console.log(thing.target.nextElementSibling.children[0].innerHTML)
          let currentDoc = thing.target.nextElementSibling.children[2].innerHTML
          let docRef = doc(db, 'cards', currentDoc)
          var cardName = document.querySelector("#title")
          var cardDesc = document.querySelector("#shortdescription")
          var cardNote = document.querySelector("#notes")
          var cardImg = document.querySelector("#image")
          var cardid = document.querySelector('#gone')
          
          
          onSnapshot(docRef, (doc) => {
            cardImg.src = doc.data().imgurl
            cardName.innerHTML = doc.data().name
            cardDesc.innerHTML = doc.data().shortdescription
            cardNote.innerHTML = doc.data().notes
            cardid.innerHTML =  currentDoc
          })
          
           document.querySelector('#delete').addEventListener('click', function(event){
            // console.log(document.querySelector('.'+ document.querySelector('#gone').innerHTML))
            deleteDoc(doc(db,'cards', document.querySelector('#gone').innerHTML))
            .then(() => {
              document.querySelector('.box').style.display ='none'
              document.querySelector('.'+document.querySelector('#gone').innerHTML).remove()
            })
          })
          
      })
      })
    })
  .catch(err => {
    console.log(err.message)
  })


      document.querySelectorAll('.card').forEach(function(event){
        event.addEventListener('click',function(thing){
          console.log(thing.target.nextElementSibling.children[0].innerHTML)
          document.querySelector('.box').style.display ='block'
        })
      })
        document.querySelector("#closeButton").addEventListener("click", function(){
          document.querySelector('.box').style.display ='none'
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
  
  
  
      document.querySelector('#save').addEventListener('click', function(){
        const docId = document.querySelector('#gone')
        const docRef = doc(db, 'cards', docId.innerHTML)
        
        updateDoc(docRef, {
          name: document.querySelector('#title').innerHTML
          
        })
        
        updateDoc(docRef, {
          notes: document.querySelector('#notes').innerHTML
        })
        
          updateDoc(docRef, {
          shortdescription: document.querySelector('#shortdescription').innerHTML
        })
        
      })

























