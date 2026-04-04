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

const API_URL = "https://script.google.com/macros/s/AKfycbzE3xCF-b4wfLDErLWqu71Puz4vQsqgVacMuYe6fNT89267HWCPuoTGjziys7UERXQ0DQ/exec";

function renderHTML(dataArray) {
    let htmlContent = "";
    dataArray.forEach(project => {
        if(project.ten_du_an !== "") {
            htmlContent += `
                <div class="card">
                    <img src="${project.hinh_anh}" alt="${project.ten_du_an}" class="thumbail">
                    <div class="card-content">
                        <h3 class="name">${project.ten_du_an}</h3>
                        <p class="description">${project.mo_ta}</p>
                        <a class="detail" href="${project.link_du_an}" target="_blank">Xem chi tiết</a>
                    </div>
                </div>
            `;
        }
    });
    return htmlContent; 
}

async function loadProjects() {
    const container = document.getElementById("project-container");

    const cachedData = localStorage.getItem("my_projects");

    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        container.innerHTML = renderHTML(parsedData); 
    } else {
        container.innerHTML = `<div class="loader"></div>`;
    }

    try {
        const response = await fetch(API_URL);
        const freshData = await response.json(); 

        localStorage.setItem("my_projects", JSON.stringify(freshData));

        container.innerHTML = renderHTML(freshData);

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu mới:", error);
        if (!cachedData) {
            container.innerHTML = `<p style="text-align:center;">Lỗi kết nối mạng. Vui lòng thử lại!</p>`;
        }
    }
}

loadProjects();

//Đây là đoạn code doGet() trên app script
// function doGet(e) {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      
//   const data = sheet.getDataRange().getValues();
      
//   const headers = data[0];
//   const resultArray = [];
    
//   for (let i = 1; i < data.length; i++) { //đây là vòng lặp, lặp qua từng hàng
//       const row = data[i];  //lặp qua các hàng dữ liệu trong sheet   
//       const object = {};  //tạo ra 1 đối tượng mới rỗng để chứa dữ liệu dạng JSON
        
//       for (let j = 0; j < headers.length; j++) { //đây là vòng lặp, lặp qua từng cột với header
//           object[headers[j]] = row[j];// ghép nối từng phần tử trong mảng data đúng với tiêu đề của nó
//       }
        
//       resultArray.push(object); //sau đó push cái object đã ghép nối thành công vào mảng đã khởi tạo rỗng ban đầu
//       //object bây giờ sẽ có dạng key1-value1, key2-value2
//     }
//   const jsonString = JSON.stringify(resultArray);
//   return ContentService.createTextOutput(jsonString)
//                          .setMimeType(ContentService.MimeType.JSON);
// }
//b1: truy cập vào excel, lấy cái file đang active, sau đó truy cập vào sheet đang active
//b2: quét hết cả trang tính, sau đó getValus để lấy dữ liệu ra => nó đang là mảng 2 chiều
//b3: lấy dòng đầu tiên của mảng => data[0] làm header = tiêu đề
//b4: tạo 1 mảng rỗng để chứa dữ liệu dạng JSON key-value
//b5: duyệt qua mảng dữ liệu (bỏ qua hàng tiêu đề)

//b6: ghép nối dữ liệu -> đẩy nó lên mảng kết quả
//b7: chuyển đổi thành kiểu text/string để có thể truyền qua internet
//b8: đóng gói, tạo 1 text output -> báo cáo nó là 1 JSON


const translations = {
    "nav":{
        "home":{
            "vi": "Trang chủ",
            "en": "Home"
        },
        "story":{
            "vi": "Câu chuyện",
            "en": "Story"
        },
        "music":{
            "vi": "Âm nhạc",
            "en": "Music"
        },
        "english":{
            "vi": "Tiếng anh",
            "en": "English"
        }
    },
    "hero": {
        "hello": {
            "vi": "Xin chào thế giới",
            "en": "Hello world"
        },
        "coder": {
            "vi": "Tôi là một lập trình viên",
            "en": "I am a coder"
        },
        "description": {
            "vi": "Tôi thích code, tôi có thể code mỗi ngày",
            "en": "I love code, i can code every single day"
        },
        "btn": {
            "vi": "Gọi cho tôi ngay nào",
            "en": "Call me now"
        }
    },
    "project": {
        "title": {
            "vi": "DỰ ÁN",
            "en": "PROJECT"
        }
    },
    "skill": {
        "title": {
            "vi": "KỸ NĂNG",
            "en": "SKILLS"
        }
    },
    "contact": {
        "title": {
            "vi": "LIÊN HỆ",
            "en": "CONTACT"
        },
        "info": {
            "vi": "Thông tin liên lạc",
            "en": "INFO"
        },"address": {
            "vi": "Địa chỉ",
            "en": "Address: Cần Thơ, Việt Nam"
        },"name": {
            "vi": "Tên của bạn",
            "en": "Name"
        },"email": {
            "vi": "Email của bạn",
            "en": "Email"
        },"message": {
            "vi": "Lời nhắn...",
            "en": "Message..."
        },"send": {
            "vi": "Gửi tin nhắn",
            "en": "Send message"
        }
    },
    "footer": {
        "quote": {
            "vi": "Nếu cuộc sống này là sự chịu đựng hãy chọn điều bạn muốn",
            "en": "Life is suffering and so choose something worth suffering for - Graham Weaver"
        },
        "copyright": {
            "vi": "2026 Bản quyền thuộc về Anhchamchi.",
            "en": "2026 Copyright Anhchamchi."
        }
    }
}

function changeLanguage(lang){
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element=>{
        let maVach = element.getAttribute("data-i18n");
        let keys = maVach.split(".");
        let chuMoi = translations[keys[0]][keys[1]][lang];
        element.innerHTML = chuMoi;
    })
}
const vi = document.getElementById("btn-vi");
const en = document.getElementById("btn-en");
vi.addEventListener("click", ()=> {
    changeLanguage("vi");
    localStorage.setItem("change-lang", "vi");
})
en.addEventListener("click", ()=>{
    changeLanguage("en");
    localStorage.setItem("change-lang", "en");
})
const saveLang = localStorage.getItem("change-lang");
if(saveLang){
    changeLanguage(saveLang);
}
else{
    changeLanguage("vi");
}