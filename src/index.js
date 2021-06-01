let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event =>{
        event.preventDefault()
        //console.log(event.target)
        addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }    
  });
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    //console.log(json)
    createCard(json)
  })
// Adds new toy with the infomation given by the user
  function addNewToy(info){    

     let formToy = {
        name :info.name.value ,
        image :info.name.value,
        likes : 0
      }
      const configOb = {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
          "Accept" : "application/json"
        },
        body:JSON.stringify(formToy)
      }
      fetch("http://localhost:3000/toys",configOb)
    } 

  //Post all the images from the server
  function createCard(Deck){
    const toyCol = document.getElementById("toy-collection")
    //console.log(Deck)
    for(const card in Deck){      
      //console.log(Deck[card]) 
      const addDiv = document.createElement("div")
      const addImg = document.createElement("img")
      const addH2 = document.createElement("h2")
      const addP = document.createElement("p")
      const addButton = document.createElement("button")
      toyCol.appendChild(addDiv)
      addDiv.appendChild(addH2)         
      addDiv.appendChild(addImg)
      addDiv.appendChild(addP)
      addDiv.appendChild(addButton)
      
      addDiv.className = "card"      
      addH2.innerText = Deck[card]["name"]
      addImg.src = Deck[card]["image"]
      addImg.className = "toy-avatar"
      addP.innerText = Deck[card]["likes"]
      addButton.className = "like-btn"
      addButton.id = Deck[card]
      addButton.innerText = "Like <3"    

      addButton.addEventListener("click", function(){
        addLikes(Deck[card]["likes"], Deck[card]["id"])})
      //console.log(Deck.ta)  
      
    }    
  }
  
  function addLikes(like, info){
    like.preventDefault


   fetch(` http://localhost:3000/toys/${info}`,{
     method: "PATCH",
     headers: {
       "Content-Type":"application/json",
       "Accept":"application/json"
     },
     body: JSON.stringify({
       "likes": like + 1
     })
   })
   .then (func => func.json())
   .then((object => like = "likes"))
  }


});
