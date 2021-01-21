const form = document.getElementById("search-form");
const input = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const currentUrl = location.origin;

document.addEventListener("DOMContentLoaded",()=>{
    searchBtn.addEventListener("click",(e)=>{
        if(input.value.length){
            location.assign(`${currentUrl}/search/?q=${input.value}`);
        }
    });
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        location.assign(`${currentUrl}/search/?q=${input.value}`);
    });
});