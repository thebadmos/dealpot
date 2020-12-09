const mainTag = document.getElementById("main-search");

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

if(parseInt(mainTag.dataset.id) > 0){
    let likeTag = document.querySelectorAll("#like");
    let notifyTag = document.querySelectorAll("#notify");

    likeTag.forEach(tag=>tag.addEventListener("click",addToFav))
    notifyTag.forEach(tag=>tag.addEventListener("click",notifyProduct))
}
