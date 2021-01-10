
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramsUrl = {search:urlParams.get('q'),page:Number(urlParams.get('p'))};
const mainElem = document.getElementById("main-search")
// import DisplayAndStore from './display-storeClass.js';
console.log("search.js")
const search = (async() => {
    console.log(paramsUrl);
   const response = await fetch(`${location.origin}/${mainElem.dataset.url}`,{method:"POST",headers: {
    'Content-Type': 'application/json'
  },body:JSON.stringify(paramsUrl)});
   const result = await response.json();
  //  console.log(result);
  repitition(result)
  // const displayClass = new DisplayAndStore(result);
})();
 
const HTML = (data) => {
  if(data.data.length){
    if (data.user.isAuth) setLocalStorage(data.data,data.user.userId);
    let tasksHtml = data.data.reduce((html,product)=>{
      product.userId = data.user.userId;
      product.isPresent = null;
      if(data.userSaves.length) product.isPresent = findProd(data.userSaves,product)
        return html += generateTaskHtml(product,data.user.isAuth)
    }, "");
    document.getElementById("main-search").innerHTML = tasksHtml;
    displaypageBtn(data.pageNo,data.urlPath);
  }else{
    document.getElementById("main-search").innerHTML = "<h2>No results found!.....</h2>";
  }
  
}

const generateTaskHtml = (product,user) => {
    
    return `<div class="card" style="width: 15rem;">
    <img src="${product.imgUrl}" class="card-img-top" alt="${product.itemTitle}" style="width: 200px; height: 200px;">
    <div class="card-body">
      <p class="card-text">${product.vendor}</p>
      <p class="card-text">${product.itemTitle}</p>
      <p class="card-text">${product.itemPrice}</p>
      <p class="card-text">
      <span onclick='addToFav(event,"${product.url}","${product.userId}")'><i class='${product.isPresent ? "fas fa-heart touch" : "far fa-heart"}' id="like" ></i></span>
      <span onClick='addToNotify(event,"${product.url}","${product.userId}")'><i class='${product.isPresent ? 
        product.isPresent.notify ?
        "fas fa-bell" : "far fa-bell"
        : "far fa-bell"}' id="notify"></i></span>
      </p>
      <a ${user ? `href=${product.url}` : "href=javascript:void(0) title='You need to login'"} ${user ? `target="_blank"` : ""} 
          class="btn btn-primary">Go to vendor</a>
    </div>
  </div>`
}


const addToFav = async(e,url,userId) =>{
  // console.log(e.target)
  console.log(url);
  // console.log(`${location.origin}/customer/wishlist/add`)
  const getProduct = getLocalStorage(url,userId);
  const response = await fetch(`${location.origin}/customer/wishlist/add`,{method:"POST",headers: {
    'Content-Type': 'application/json'
  },body:JSON.stringify({prodItem:getProduct})});
   const result = await response.json();
   console.log(result);
   if(result.message === true){
    e.target.parentElement.innerHTML = `<i class="fas fa-heart touch" id="like" ></i>`
   }else if(!result.message){
    e.target.classList.remove("fas");
    e.target.classList.remove("touch");
    e.target.classList.add("far");
    // console.log(e)
    e.target.parentElement.nextElementSibling.firstElementChild.classList.remove("fas")
    e.target.parentElement.nextElementSibling.firstElementChild.classList.remove("touch")
    e.target.parentElement.nextElementSibling.firstElementChild.classList.add("far")
   }else{
    alert("You need to login");
   }
}
const addToNotify = async(e,url,userId) =>{
  // console.log(e.target)
  console.log(url,typeof(userId));
  // console.log(`${location.origin}/customer/wishlist/add`)
  const getProduct = getLocalStorage(url,userId);
  
  const response = await fetch(`${location.origin}/customer/notify/add`,{method:"POST",headers: {
    'Content-Type': 'application/json'
  },body:JSON.stringify({prodItem:getProduct})});
   const result = await response.json();
   console.log(result);
   if(result.message === true){
    e.target.parentElement.innerHTML = `<i class="fas fa-bell" id="notify" ></i>`;
    e.path[1].previousElementSibling.innerHTML = `<i class="fas fa-heart touch" id="like" ></i>`;
    // console.log(e)
   }else if(result.message === false){
    e.target.classList.remove("fas");
    e.target.classList.add("far");
   }else{
    alert("You need to login");
   }
}

const setLocalStorage = (data,id) => {
  let products = JSON.parse(localStorage.getItem(`product${id}`)) || [];
  products = [...data];
  localStorage.setItem(`product${id}`, JSON.stringify(products))
}

const getLocalStorage = (url,id) => {
  // product5fd0c0d82c4bdf220cc9cf7d
  let products = JSON.parse(localStorage.getItem(`product${id}`));
  if(products){
    let produ = products.find(prod=> prod.url === url);
    console.log("produ",produ)
    return produ;
  }
  return {};
}

const findProd = (source,target) => {
    return source.find(prod=> prod.url === target.url)
}

const repitition = (result) => {
  if(result.data.length){
    let check = result.data[0].vendor;
    let compare = result.data[0].vendor;
    result.data.forEach(prod=>{
      if(prod.vendor != check && prod.vendor != "Testweb"){
        compare = prod.vendor;
      }
    })
    check === compare ? HTML({...result,data:[]}) : HTML(result)
  }else{
    HTML(result)
  }
    
}

const displaypageBtn = (pageNumber,pageUrl) => {
  document.getElementById("navigatePageBtn").classList.remove("hide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  console.log(prevBtn,nextBtn)
  const gotoUrl = pageUrl ? `${location.origin}/${pageUrl}/?` : `${location.origin}/search/?q=${paramsUrl.search}&`;
  if(pageNumber == 1){
    prevBtn.classList.add("hide");
  }
  prevBtn.textContent = `prev - ${pageNumber - 1}`;
  nextBtn.textContent = `next - ${pageNumber + 1}`;

  prevBtn.setAttribute("href",`${gotoUrl}p=${pageNumber - 1}`);
  nextBtn.setAttribute("href",`${gotoUrl}p=${pageNumber + 1}`);
}



// <%data.forEach(prod=>{%>
//   <div class="card" style="width: 18rem;">
//     <img src="<%=prod.imgUrl%>" class="card-img-top" alt="${prod.itemTitle}">
//     <div class="card-body">
//       <p class="card-text"><%=prod.vendor%></p>
//       <p class="card-text"><%=prod.itemTitle%></p>
//       <p class="card-text"><%=prod.itemPrice%></p>
//       <p class="card-text">
//       <span onclick="()=>alert('hi')"><i class="far fa-heart" ></i></span>
//       <span><i class="far fa-bell"></i></span>
//       </p>
//       <a ${user ? `href=${task.url}` : "href=javascript:void(0)"} ${user ? `target="_blank"` : ""} 
//           class="btn btn-primary">Go to vendor</a>
//     </div>
//   </div>
// <%})%>
