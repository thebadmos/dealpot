
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramsUrl = { search: urlParams.get('q'), page: Number(urlParams.get('p')) };
const mainElem = document.getElementById("main-search");
const search = (async () => {
  const response = await fetch(`${location.origin}/${mainElem.dataset.url}`, {
    method: "POST", headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(paramsUrl)
  });
  const result = await response.json();
  repitition(result)
})();

const HTML = (data) => {
  if (data.data.length) {
    if (data.user.isAuth) setLocalStorage(data.data, data.user.userId);
    let tasksHtml = data.data.reduce((html, product) => {
      product.userId = data.user.userId;
      product.isPresent = null;
      if (data.userSaves.length) product.isPresent = findProd(data.userSaves, product)
      return html += generateTaskHtml(product, data.user.isAuth)
    }, "");
    document.getElementById("display-products").innerHTML = tasksHtml;
    // loginBtn();
    displaypageBtn(data.pageNo, data.urlPath);
  } else {
    document.getElementById("main-search").innerHTML = "<h2>No results found!.....</h2>";
  }

}

const generateTaskHtml = (product, user) => {

  return `
          <div class="product-grid">               
          <img src="${product.imgUrl}"  alt="${product.itemTitle}">
          <span class="" onclick='addToFav(event,"${product.url}","${product.userId}")'><i data-target=${!user && "#myModal" } data-toggle=${!user && "modal"} class='${product.isPresent ? "fas fa-heart heart-color" : "far fa-heart"}' id="${product.url}-like" ></i></span>
                    <h6 class="caption-tems">${product.vendor}</h6>
                    <h5 id="nameTag">${formatTitle(product.itemTitle)}</h5>
                    <h5 class="priceTag">${product.itemPrice} &nbsp;</h5> 
                    <span onClick='addToNotify(event,"${product.url}","${product.userId}")'><i data-target=${!user && "#myModal" } data-toggle=${!user && "modal"} class='${product.isPresent ?
      product.isPresent.notify ?
        "fas fa-bell" : "far fa-bell bell-color"
      : "far fa-bell bell-color"}' id="${product.url}-bell"></i></span>
      ${user ?
      `<a class="btn btn-primary" href="${product.url}" target="_blank">Go to vendor</a>` :
      `<button class="btn btn-primary" data-target=${!user && "#myModal" } data-toggle=${!user && "modal"}>Go to vendor</button>`
    }
            
                </div>
    `
}


const addToFav = async (e, url, userId) => {
  // console.log("hi-fav",e,url,userId)
  let notifyBtn = document.getElementById(`${url}-bell`)
  const getProduct = getLocalStorage(url, userId);
  const response = await fetch(`${location.origin}/customer/wishlist/add`, {
    method: "POST", headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ prodItem: getProduct })
  });
  const result = await response.json();
  if (result.message === true) {
    e.target.classList.remove("far");
    e.target.classList.add("fas")
    e.target.classList.add("heart-color")
  } else if (!result.message) {
    e.target.classList.remove("fas");
    e.target.classList.remove("heart-color");
    e.target.classList.add("far");
    notifyBtn.classList.remove("fas")
    notifyBtn.classList.add("far")
    notifyBtn.classList.add("bell-color")
  }
}
const addToNotify = async (e, url, userId) => {
  // console.log("hi-notify",e,url,userId)
  let likeBtn = document.getElementById(`${url}-like`)
  const getProduct = getLocalStorage(url, userId);
  const response = await fetch(`${location.origin}/customer/notify/add`, {
    method: "POST", headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ prodItem: getProduct })
  });
  const result = await response.json();
  if (result.message === true) {
    e.target.classList.remove("far")
    e.target.classList.remove("bell-color")
    e.target.classList.add("fas")
    
    likeBtn.classList.remove("far")
    likeBtn.classList.add("fas")
    likeBtn.classList.add("heart-color")
  } else if (result.message === false) {
    e.target.classList.remove("fas");
    e.target.classList.add("far");
    e.target.classList.add("bell-color");
  }
}

const setLocalStorage = (data, id) => {
  let products = JSON.parse(localStorage.getItem(`product${id}`)) || [];
  products = [...data];
  localStorage.setItem(`product${id}`, JSON.stringify(products))
}

const getLocalStorage = (url, id) => {
  let products = JSON.parse(localStorage.getItem(`product${id}`));
  if (products) {
    let produ = products.find(prod => prod.url === url);
    return produ;
  }
  return {};
}

const findProd = (source, target) => {
  return source.find(prod => prod.url === target.url)
}

const repitition = (result) => {
  if (result.data.length) {
    let check = result.data[0].vendor;
    let compare = result.data[0].vendor;
    result.data.forEach(prod => {
      if (prod.vendor != check && prod.vendor != "Testweb") {
        compare = prod.vendor;
      }
    })
    check === compare ? HTML({ ...result, data: [] }) : HTML(result)
  } else {
    HTML(result)
  }

}

const displaypageBtn = (pageNumber, pageUrl) => {
  document.getElementById("pagination-nav").classList.remove("hide");
  const prevBtn = document.getElementById("previous-btn");
  const firstBtn = document.getElementById("first-pagination");
  const lastBtn = document.getElementById("last-pagination")
  const nextBtn = document.getElementById("next-btn");
  const currentBtn = document.getElementById("current-pagination");
  const gotoUrl = pageUrl ? `${location.origin}/${pageUrl}/?` : `${location.origin}/search/?q=${paramsUrl.search}&`;
  if (pageNumber == 1) {
    firstBtn.classList.add("active");
    firstBtn.innerHTML = `<span class="page-link" id="current-pagination">${pageNumber}<span class="sr-only">(current)</span></span>`;
    currentBtn.parentElement.classList.remove("active");
    currentBtn.parentElement.innerHTML = `<a class=page-link href=${gotoUrl}p=${pageNumber + 1} >${pageNumber + 1}</a>`;
    lastBtn.textContent = pageNumber + 2;
    lastBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 2}`);
    nextBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 1}`)
    return;
  }
  prevBtn.classList.remove("disabled");
  prevBtn.innerHTML = `<a class=page-link href=${gotoUrl}p=${pageNumber - 1} >Previous</a>`;
  firstBtn.innerHTML = `<a class=page-link href=${gotoUrl}p=${pageNumber - 1} >${pageNumber - 1}</a>`;
  currentBtn.innerHTML = `${pageNumber} <span class="sr-only">(current)</span>`;
  lastBtn.textContent = pageNumber + 1;
  lastBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 1}`)
  nextBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 1}`)
  // prevBtn.textContent = `prev - ${pageNumber - 1}`;
  // nextBtn.textContent = `next - ${pageNumber + 1}`;

  // prevBtn.setAttribute("href", `${gotoUrl}p=${pageNumber - 1}`);
  // nextBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 1}`);

}

const formatTitle = (str) => {
  if (str.length > 40) {
    return `${str.substring(0, 40)}...`;
  }
  return str;
}
// const loginBtn = () => {
//   $('.getVendor').click(function () {
//     $('.modal-ven').show();

//   });
//   $('.modal-ven .close').click(function () {
//     $('.modal-ven').hide();

//   });
// }

const scrolltoTopBtn = document.getElementById("scrollToTop");
scrolltoTopBtn.addEventListener("click",()=>{
  scrolltoTopBtn.classList.remove("goTop");
    scrolltoTopBtn.classList.add("hide");
  document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; //For Chrome, Firefox, IE and Opera
})
const goTopShow = () => {
  if(document.body.scrollTop > 2684 || document.documentElement.scrollTop > 2684){
    scrolltoTopBtn.classList.remove("hide");
    scrolltoTopBtn.classList.add("goTop");
  }else{
    scrolltoTopBtn.classList.remove("goTop");
    scrolltoTopBtn.classList.add("hide");
  }
}

window.onscroll = () => goTopShow();