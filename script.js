const hamburger = document.querySelector(".menu");
const icon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".overlay-bg");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active")
        
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});
const darkmode = document.getElementById("dark-mode-checkbox");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    darkmode.checked = true;
}
darkmode.addEventListener("change", ()=>{
    if(darkmode.checked){
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }
    else{
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
})
// 1. Dán cái link API mà bạn lấy được từ Trạm 2 vào đây
const API_URL = "https://script.google.com/macros/s/AKfycbzE3xCF-b4wfLDErLWqu71Puz4vQsqgVacMuYe6fNT89267HWCPuoTGjziys7UERXQ0DQ/exec";

// 2. Tạo một hàm Bất đồng bộ (async) để có thể dùng lệnh chờ (await)
async function loadProjects() {
    // Tóm lấy cái mâm rỗng trong HTML
    const container = document.getElementById("project-container");
    // 1. NGAY LẬP TỨC HIỂN THỊ LOADING TRƯỚC KHI LÀM GÌ KHÁC
    // Bạn có thể chèn một chuỗi HTML chứa icon xoay xoay, hoặc đơn giản là dòng chữ.
    container.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 50px 0;">
            <p>⏳ Đang tải các dự án siêu xịn của Han Jisung...</p>
        </div>
    `;

    try {
        // KHÂU 2: Cử người đi lấy hàng và CHỜ (await)
        const response = await fetch(API_URL);
        
        // KHÂU 3: Khui thùng hàng thành JSON và CHỜ (await)
        const data = await response.json(); 
        
        // Chuẩn bị một chuỗi rỗng để gom các card lại
        let htmlContent = "";

        // KHÂU 4: Chạy vòng lặp qua từng dòng dữ liệu từ Google Sheets
        data.forEach(project => {
            // Kiểm tra xem dòng đó có dữ liệu không (tránh lỗi dòng trống ở cuối Excel)
            if(project.ten_du_an !== "") {
                
                // Dùng dấu backtick ( ` ) để bọc đoạn HTML. 
                // Dùng ${project.tên_cột_trong_excel} để nhét dữ liệu thật vào.
                htmlContent += `
                    <div class="card">
                        <img src="${project.hinh_anh}" alt="${project.ten_du_an}" class="thumbail">
                        <div class="card-content">
                            <h3 class="name">
                                ${project.ten_du_an}
                            </h3>
                            <p class="description">
                                ${project.mo_ta}
                            </p>
                            <a class="detail" href="${project.link_chi_tiet}" target="_blank">Xem chi tiết</a>
                        </div>
                    </div>
                `;
            }
        });

        // Ốp toàn bộ các thẻ card vừa đúc xong vào trong HTML
        container.innerHTML = htmlContent;

    } catch (error) {
        // Nếu có lỗi (như rớt mạng, sai link), nó sẽ báo ở đây để web không bị sập
        console.error("Lỗi khi tải dữ liệu:", error);
        container.innerHTML = "<p>Không thể tải dữ liệu dự án. Vui lòng thử lại sau!</p>";
    }
}

// 3. Ra lệnh cho hàm chạy ngay khi trang web vừa tải xong
loadProjects();
