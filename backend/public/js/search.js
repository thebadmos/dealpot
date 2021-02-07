
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
    loginBtn();
    displaypageBtn(data.pageNo, data.urlPath);
  } else {
    document.getElementById("main-search").innerHTML = "<h2>No results found!.....</h2>";
  }

}

const generateTaskHtml = (product, user) => {

  return `
          <div class="product-grid">               
          <img src="${product.imgUrl}"  alt="${product.itemTitle}">
          <span class="like" onclick='addToFav(event,"${product.url}","${product.userId}")'><i class='${product.isPresent ? "fas fa-heart heart-color" : "fas fa-heart"}' id="like" ></i></span>
                    <h6 class="caption-tems">${product.vendor}</h6>
                    <h5 id="nameTag">${formatTitle(product.itemTitle)}</h5>
                    <h5 class="priceTag">${product.itemPrice} &nbsp;</h5> 
                    <span onClick='addToNotify(event,"${product.url}","${product.userId}")'><i class='${product.isPresent ?
      product.isPresent.notify ?
        "fas fa-bell" : "fas fa-bell bell-color"
      : "fas fa-bell bell-color"}' id="notify"></i></span>
                            ${user ?
      `<a class="btn btn-primary" href="${product.url}" target="_blank">Go to vendor</a>` :
      `<button class="btn btn-primary" >Go to vendor</button>`
    }
            
                </div>
    `
}


const addToFav = async (e, url, userId) => {
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
    e.path[2].children[5].firstElementChild.classList.remove("fas")
    e.path[2].children[5].firstElementChild.classList.add("far")
    e.path[2].children[5].firstElementChild.classList.add("bell-color")
  } else {
    document.querySelector('.modal-ven').classList.remove("hide");
  }
}
const addToNotify = async (e, url, userId) => {
  const getProduct = getLocalStorage(url, userId);
  const response = await fetch(`${location.origin}/customer/notify/add`, {
    method: "POST", headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ prodItem: getProduct })
  });
  const result = await response.json();
  if (result.message === true) {
    e.target.parentElement.innerHTML = `<i class="fas fa-bell" id="notify" ></i>`;
    e.path[2].children[1].innerHTML = `<i class="fas fa-heart heart-color" id="like" ></i>`;
  } else if (result.message === false) {
    e.target.classList.remove("fas");
    e.target.classList.add("far");
    e.target.classList.add("bell-color");
  } else {
    document.querySelector('.modal-ven').classList.remove("hide");
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
  document.getElementById("navigatePageBtn").classList.remove("hide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const gotoUrl = pageUrl ? `${location.origin}/${pageUrl}/?` : `${location.origin}/search/?q=${paramsUrl.search}&`;
  if (pageNumber == 1) {
    prevBtn.classList.add("hide");
  }
  prevBtn.textContent = `prev - ${pageNumber - 1}`;
  nextBtn.textContent = `next - ${pageNumber + 1}`;

  prevBtn.setAttribute("href", `${gotoUrl}p=${pageNumber - 1}`);
  nextBtn.setAttribute("href", `${gotoUrl}p=${pageNumber + 1}`);
}

const formatTitle = (str) => {
  if (str.length > 40) {
    return `${str.substring(0, 40)}...`;
  }
  return str;
}
const loginBtn = () => {
  $('.getVendor').click(function () {
    $('.modal-ven').show();

  });
  $('.modal-ven .close').click(function () {
    $('.modal-ven').hide();

  });
}
