const mainTag = document.getElementById("main-search");

const addToFav = async(e) =>{
    const parent = e.target.parentElement.parentElement;
    const response = await fetch(`${location.origin}/customer/wishlist/add`,{method:"POST",headers: {
      'Content-Type': 'application/json'
    },body:JSON.stringify({url:e.target.dataset.id})});
     const result = await response.json();
     if(!result.message){
        mainTag.removeChild(parent);
        if(!mainTag.children.length) {
            mainTag.innerHTML = "<h1>No saved item yet</h1>";
        }
     }
  }
const notifyProduct = async(e) =>{
    const response = await fetch(`${location.origin}/customer/notify/add`,{method:"POST",headers: {
      'Content-Type': 'application/json'
    },body:JSON.stringify({url:e.target.dataset.id})});
     const result = await response.json();
     if(!result.message){
        e.target.classList.remove("fas");
        e.target.classList.add("far");
     }else{
        e.target.classList.remove("far");
        e.target.classList.add("fas");
     }
  }

const showPriceHistory = async(e) => {
   const response = await fetch(`${location.origin}/customer/wishlist`,{method:"POST",headers: {
      'Content-Type': 'application/json'
    },body:JSON.stringify({pwd:true,id:e.target.dataset.id})});
     const result = await response.json();
   //   result.wishlistData = false;
   let [currentPrice,priceHistory] = result.wishlistData;
      if(priceHistory.length){
         document.querySelector("#user-modal .modal-body").innerHTML = "<ul class='list-group list-group-flush text-muted'></ul>";
         const showPriceList = document.querySelector("#user-modal ul");
         showPriceList.innerHTML = "";
         for(let i = 0; i < priceHistory.length; i++){
            let listElem = document.createElement("li");
            listElem.classList.add("list-group-item", "strike-text");
            listElem.textContent = priceHistory[i];
            showPriceList.appendChild(listElem);
         }
            let listElem = document.createElement("li");
            listElem.classList.add("list-group-item");
            listElem.textContent = currentPrice;
            showPriceList.appendChild(listElem);
      }else{
         document.querySelector("#user-modal .modal-body").innerHTML = "<h3>No price history for this product yet.</h3>";
      }
     
}

if(parseInt(mainTag.dataset.id) > 0){
    let likeTag = document.querySelectorAll("#like");
    let notifyTag = document.querySelectorAll("#notify");
    let priceHistoryModal = document.querySelectorAll("#modal-btn");

    likeTag.forEach(tag=>tag.addEventListener("click",addToFav))
    notifyTag.forEach(tag=>tag.addEventListener("click",notifyProduct))
    priceHistoryModal.forEach(tag=>tag.addEventListener("click",showPriceHistory))
}

const formatTitle = (str) => {
   if(str.length > 20){
     return `${str.substring(0,20)}...`;
   }
   return str;
 }