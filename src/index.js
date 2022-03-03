import{ initializeApp }from 'firebase/app'
import{
  getFirestore, collection, getDocs
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
getDocs(colRef)
  .then(function(snapshot){
    let cards = []
    snapshot.docs.forEach(function(doc){
      cards.push({ ...doc.data(), id:doc.id })
    })
    cards.forEach(function(event){
      var place = document.createElement('div')
      var card = document.createElement('div')
      var picture = document.createElement('img')
      var bod = document.createElement('div')
      var names = document.createElement('h4')
      var description = document.createElement('p')
      //add class
      place.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3')
      card.classList.add('card')
      picture.classList.add('card-img-top', 'col-xl-4')
      bod.classList.add('card-body')
      names.classList.add('card-title')
      description.classList.add('card-text')
      //insert info
      picture.src = event.imgurl
      names.innerHTML = event.name
      description.innerHTML = event.shortdescription
      //construct card
      bod.appendChild(names)
      bod.appendChild(description)
      card.appendChild(picture)
      card.appendChild(bod)
      place.appendChild(card)
      document.querySelector('.row').appendChild(place)
      
      document.querySelectorAll('.card').forEach(function(event){
        event.addEventListener('click',function(thing){
          console.log(thing.target.nextElementSibling.children[0].innerHTML)
          // document.querySelector('.box').style.display ='block'
          location.href = 'cards/card.html'
        })
      })
      
    })
    
    document.querySelector('#create').addEventListener('click', function(event){
      console.log(cards)
      //create card
      var place = document.createElement('div')
      var card = document.createElement('div')
      var picture = document.createElement('img')
      var bod = document.createElement('div')
      var name = document.createElement('h4')
      var description = document.createElement('p')
      //add class
      place.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3')
      card.classList.add('card')
      picture.classList.add('card-img-top', 'col-xl-4')
      bod.classList.add('card-body')
      name.classList.add('card-title')
      description.classList.add('card-text')
      //insert info
      picture.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAP1BMVEXm5+jp6uuTlZjAwMHX2NnKysuMjpKQkpXr7O3j5OWtr7Hg4eK0tbfBw8Wlp6mfoaSXmZzR0tS5u72vsbOoqan5fWL2AAAClElEQVR4nO3Wy27iQBBAUXfHdDdvk8z/f+vYvKMJEHEXrpHuXcECqXRU2NUtUmfv1nfygeRDyYeSDyUfSj6UfCj5UPKh5EPJh5IPJR9KPpR8KPlQ8qHkQ8mHkg8lH0o+lHwo+VDyoeRDyYeSDyUfSj6UfCj5UPKh5EPJh5IPJR9KPpR8KPlQ8qHkQ8mHkg8lH0o+lHwo+VDyoeRDyYeSDyUfSj6UfCj5UPKh5EPJh5IPJR9KPpR8KPlQ8qHkQ8XlS4d1u32ZcZBnheVb51I2F79+G3PIsHzpq+Zc+tOXtqvzTvOwqHyj2Mh3OM6WDqV+tle/mKWofGlbcj3vXNrnXNfzzvOgqHxd2+5X/Wn5FuMi1lXI9QvL16V2ActTl+dgrMLyXadqn3Xiq7uI6xeVb3nVWpd8Wr9DwEGD8rVVOb9r21c98eUh4PrF5EuLMj7sjoP15+Ub/74Bb+eYfOtp44bp0/H+u/jNPda/heRr+8lsulXGiznf+Dbh/r4R+c7v2lwWKQ35rni3c0C+dH3c1eW2fuMLdzsH5OuuG1d335YvX14ncYrHd7tUfmgfbP3C8U03y+NKsGnD8S2f7N7YEGvaaHz3d95PBbudg/G1j+d609t47hnvi8WX+ld6wW7nWHzd8Eov2O0cii+tyi+KdLyE4ut+9VyL9PCLxfffJR9KPpR8KPlQ8qHkQ8mHkg8lH0o+lHwo+VDyoeRDyYeSDyUfSj6UfCj5UPKh5EPJh5IPJR9KPpR8KPlQ8qHkQ8mHkg8lH0o+lHwo+VDyoeRDyYeSDyUfSj6UfCj5UPKh5EPJh5IPJR9KPpR8KPlQ8qHkQ8mHkg8lH0o+lHwo+VDyoeRDyYeSDzXytWRv1vruz/bD3m3zF/b9FIMyRG2iAAAAAElFTkSuQmCC'
      name.innerHTML = '[Placeholder]'
      description.innerHTML = '[Placeholder]'
      //construct card
      bod.appendChild(name)
      bod.appendChild(description)
      card.appendChild(picture)
      card.appendChild(bod)
      place.appendChild(card)
      document.querySelector('.row').appendChild(place)
      
  
    })
  })
  

  
  .catch(err => {
    console.log(err.message)
  })
  

  document.querySelector("#closeBox").addEventListener('click', function(event){
    // document.querySelector('.box').style.display = 'none'
    // console.log("hel")
    location.href = '../index.html'
  })