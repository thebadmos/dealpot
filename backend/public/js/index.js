const form = document.getElementById("search-form");
const input = document.getElementById("search-box");
const currentUrl = location.href;

document.addEventListener("DOMContentLoaded",()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        console.log(`${currentUrl}search/?q=${input.value}`)
        location.assign(`${currentUrl}search/?q=${input.value}`);
    })
})