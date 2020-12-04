
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = {search:urlParams.get('q')};
console.log("search.js")
const search = (async() => {
    console.log(data);
   const response = await fetch(`${location.protocol}`,{method:"POST",headers: {
    'Content-Type': 'application/json'
  },body:JSON.stringify(data)});
   const result = await response.json();
   console.log(result);
   HTML(result);
})();

const HTML = (data) => {
    let tasksHtml = data.reduce((html,task,index)=>{
        return html += generateTaskHtml(task,index)
    }, "");
    document.getElementById("main-search").innerHTML = tasksHtml;
}

const generateTaskHtml = (task,index) => {
    return `<div class="card" style="width: 18rem;">
    <img src="${task.imgUrl}" class="card-img-top" alt="${task.itemTitle}">
    <div class="card-body">
      <p class="card-text">${task.vendor}</p>
      <p class="card-text">${task.itemTitle}</p>
      <p class="card-text">${task.itemPrice}</p>
      <p class="card-text"><span>LIKE</span><span>NOTIFY</span></p>
      <a href="${task.url}" target="_blank" class="btn btn-primary">Go to vendor</a>
    </div>
  </div>`
}