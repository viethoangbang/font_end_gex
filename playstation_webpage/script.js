const title_hover = document.querySelector(".title_hover");
let hoverTimeout;

title_hover.addEventListener("mouseenter", () => {
    hoverTimeout = setTimeout(() => {
        title_hover.classList.add("active");
    }, 1000);
});

title_hover.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    title_hover.classList.remove("active");
});

title_hover.addEventListener("click", () => {
    title_hover.classList.add("active");
});
// tạo hàm xử lý zoom khi click vào ảnh
const zoomOverlay = document.createElement("div");
zoomOverlay.classList.add("zoom_overlay")
document.body.appendChild(zoomOverlay);

const zoomedImg = document.createElement("img");
zoomedImg.classList.add("zoomed_img");
zoomOverlay.appendChild(zoomedImg);

// đóng zoom khi click vào
zoomOverlay.addEventListener("click", ()=>{
    zoomOverlay.style.display = "none";
});

// sự kiện click vào ảnh.gex
function addZoomEvent(img){
    img.addEventListener("click", ()=>{
        zoomedImg.src = img.src;
        zoomOverlay.style.display = "flex";
    })
}

// Xử lý phần ảnh chi tiết game (list_detail_img)
let visibleImage = 4;
let startIndex = 0;
let detail_images = [];
let detail_img = document.querySelector(".detail_img");

async function loadImage() {
    try {
        const response = await fetch("./assets/images.json");
        const data = await response.json();
        detail_images = data.cyberpunk_images;
        console.log("Loaded images:", detail_images);

        // Hiển thị 4 ảnh đầu tiên
        for (let i = 0; i < visibleImage; i++) {
            let img = document.createElement("img");
            img.id = "img"+ i;
            
            img.src = detail_images[i % detail_images.length];
            detail_img.appendChild(img);
            addZoomEvent(img);
        }
    } catch (error) {
        console.error("Lỗi tải ảnh", error);
    }
}

//cập nhật ảnh
function updateImage() {
    if (detail_images.length === 0) return; // Nếu chưa load xong thì không chạy

    detail_img.innerHTML = ""; // Xóa ảnh cũ dm innerHTML phế vật

    for (let i = startIndex; i < startIndex + visibleImage; i++) {
        let img = document.createElement("img");
        img.id = "img"+i;
        img.src = detail_images[i % detail_images.length];
        detail_img.appendChild(img);
        addZoomEvent(img);
    }
}

// Xử lý 2 nút chuyển ảnh
function slide_right() {
    startIndex = (startIndex + 1) % detail_images.length;
    updateImage();
}

function slide_left() {
    startIndex = (startIndex - 1 + detail_images.length) % detail_images.length;
    updateImage();
}
// load ảnh
loadImage().then(() => {
    updateImage();
});

//khi bấm vào nút see more sẽ hiển thị thêm văn bản
let detail_game_text = document.querySelector(".main_content .content_left .detail_game p");
let btn_see_more = document.querySelector(".main_content .content_left input");
console.log(btn_see_more);
let click_state = false;
btn_see_more.onclick = function()
{
    if(!click_state){
        detail_game_text.classList.add("A_resize_p_tag");
        btn_see_more.value = "See less"
    }
    else{
        detail_game_text.classList.remove("A_resize_p_tag");
        btn_see_more.value = "See more"
    }
    click_state = !click_state;
}

