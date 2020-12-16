const mainTag = document.getElementById("main-search");
const showPriceList = document.querySelector("#user-modal ul");

const addToFav = async(e) =>{
    console.log(`${location.origin}/customer/wishlist/add`)
    const parent = e.target.offsetParent;
    const response = await fetch(`${location.origin}/customer/wishlist/add`,{method:"POST",headers: {
      'Content-Type': 'application/json'
    },body:JSON.stringify({url:e.target.dataset.id})});
     const result = await response.json();
     console.log(result);
     if(!result.message){
        mainTag.removeChild(parent);
        if(!mainTag.children.length) {
            mainTag.innerHTML = "<h1>No saved item yet</h1>";
        }
     }
  }
const notifyProduct = async(e) =>{
    console.log(`${location.origin}/customer/notify/add`)
    const parent = e.target.offsetParent;
    const response = await fetch(`${location.origin}/customer/notify/add`,{method:"POST",headers: {
      'Content-Type': 'application/json'
    },body:JSON.stringify({url:e.target.dataset.id})});
     const result = await response.json();
     console.log(result);
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
      if(result.wishlistData){
         let [currentPrice,priceHistory] = result.wishlistData;
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
