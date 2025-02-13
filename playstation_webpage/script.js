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

// Xử lý List detail images
let visibleImage = 4;
let startIndex = 0;
let detail_images = [];
let detail_img = document.querySelector(".detail_img");

async function loadImage() {
    try {
        const response = await fetch("./assets/images.json");
        const data = await response.json();
        detail_images = data.images;
        console.log("Loaded images:", detail_images);

        // Hiển thị 4 ảnh đầu tiên
        for (let i = 0; i < visibleImage; i++) {
            let img = document.createElement("img");
            img.src = detail_images[i % detail_images.length];
            detail_img.appendChild(img);
        }
    } catch (error) {
        console.error("Lỗi tải ảnh", error);
    }
}

// Cập nhật hình ảnh khi trượt
function updateImage() {
    if (detail_images.length === 0) return; // Nếu chưa load xong thì không chạy

    detail_img.innerHTML = ""; // Xóa ảnh cũ dm innerHTML phế vật

    for (let i = startIndex; i < startIndex + visibleImage; i++) {
        let img = document.createElement("img");
        img.src = detail_images[i % detail_images.length];
        detail_img.appendChild(img);
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

// Load ảnh và hiển thị ban đầu
loadImage().then(() => {
    updateImage();
});
