import{ initializeApp }from 'firebase/app'
import{
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, getDoc, doc,
  onSnapshot, updateDoc, setDoc,
} from 'firebase/firestore'
import{
   getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
   signOut, signInWithEmailAndPassword,
} from 'firebase/auth'




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
const auth = getAuth()

//collection ref


 onAuthStateChanged(auth, (user) => {
      
  const colRef = collection(db, 'cards')
  console.log(user.uid)

// display cards
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
      var userUid = document.createElement('p')
      var userEmail = document.createElement('p')
      //add class
      place.classList.add('col-sm-10', 'col-md-5', 'col-lg-4', 'col-xl-3', 'c' +event.id)
      card.classList.add('card')
      picture.classList.add('card-img-top', 'col-xl-3','pic', 'fixImage','b'+event.id)
      bod.classList.add('card-body', 'bod')
      names.classList.add('card-title')
      description.classList.add('card-text')
      docId.style.display = 'none'
      userUid.style.display = 'none'
      

      //insert info
      picture.src = event.imgurl
      names.innerHTML = event.name
      description.innerHTML = event.shortdescription
      docId.innerHTML = event.id
      userUid.innerHTML = event.uid
      userEmail.innerHTML = "created by:" + event.email
      //construct card
      bod.appendChild(names)
      bod.appendChild(description)
      bod.appendChild(docId)
      bod.appendChild(userEmail)
      bod.appendChild(userUid)
      card.appendChild(picture)
      card.appendChild(bod)
      place.appendChild(card)
      document.querySelector('.row').appendChild(place)
      
    //display card in box
      place.addEventListener('click',function(thing){
        var targetCard
        targetCard = thing.path[1]

        document.querySelector('.box').style.display ='block'
        // console.log(thing.target.nextElementSibling.children[0].innerHTML)
        let currentDoc = thing.target.nextElementSibling.children[2].innerHTML
        let docRef = doc(db, 'cards', currentDoc)
        var cardName = document.querySelector("#title")
        var cardDesc = document.querySelector("#shortdescription")
        var cardNote = document.querySelector("#notes")
        var cardImg = document.querySelector("#image")
        var cardid = document.querySelector('#gone')
        var userId = document.querySelector("#notgone")
        
        onSnapshot(docRef, (doc) => {
          cardImg.src = doc.data().imgurl
          cardName.innerHTML = doc.data().name
          cardDesc.innerHTML = doc.data().shortdescription
          cardNote.innerHTML = doc.data().notes
          cardid.innerHTML =  currentDoc
          userId.innerHTML = userUid.innerHTML
        })
        
        // delete card
         document.querySelector('#delete').addEventListener('click', function(event){
          // console.log(document.querySelector('.'+ document.querySelector('#gone').innerHTML))
          if(userId.innerHTML == user.uid){
            deleteDoc(doc(db,'cards', document.querySelector('#gone').innerHTML))
              .then(() => {
                document.querySelector('.box').style.display ='none'
                // document.querySelector('.'+document.querySelector('#gone').innerHTML).remove()
              document.querySelector('.c' + document.querySelector('#gone').innerHTML).remove()
          })
          } 
          
        })
        
        
        //change image
        document.querySelector('#changeImgButton').addEventListener('click',function(){
          
        if(userId.innerHTML == user.uid){
             if(document.querySelector('#changeImgText').value.endsWith(".png") || document.querySelector('#changeImgText').value.endsWith(".jpg") || document.querySelector('#changeImgText').value.startsWith("https://") || document.querySelector('#changeImgText').value.startsWith("data:")){
                   const docRef = doc(db, 'cards', document.querySelector('#gone').innerHTML)
            updateDoc(docRef, {
              imgurl: document.querySelector('#changeImgText').value
            })
            document.querySelector('#image').src = document.querySelector('#changeImgText').value
            document.querySelector('.c' + document.querySelector('#gone').innerHTML).querySelector('.b'+document.querySelector('#gone').innerHTML).src = document.querySelector('#changeImgText').value

           } else {
             alert("invalid image")
           }
          } 
        })
      })
    })
  })
  .catch(err => {
    console.log(err.message)
  })

// display cards when clicked
document.querySelectorAll('.card').forEach(function(event){
  event.addEventListener('click',function(thing){
    console.log(thing.target.nextElementSibling.children[0].innerHTML)
    document.querySelector('.box').style.display ='block'
  })
})
// undisplay card when close
  document.querySelector("#closeButton").addEventListener("click", function(){
    document.querySelector('.box').style.display ='none'
  })
  
//save changes
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
  document.querySelector('.c' + document.querySelector('#gone').innerHTML).querySelector('.bod').querySelector('.card-title').innerHTML = document.querySelector('#title').innerHTML
  document.querySelector('.c' + document.querySelector('#gone').innerHTML).querySelector('.bod').querySelector('.card-text').innerHTML = document.querySelector('#shortdescription').innerHTML
  document.querySelector('.box').style.display = 'none'
})

})