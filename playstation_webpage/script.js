const title_hover = document.querySelector(".title_hover");
let hoverTimeout;

title_hover.addEventListener("mouseenter", () =>{
    hoverTimeout = setTimeout(() =>{
        title_hover.classList.add("active");
    },500)
})

title_hover.addEventListener("mouseleave",()=>{
    clearTimeout(hoverTimeout);
    title_hover.classList.remove("active");
});