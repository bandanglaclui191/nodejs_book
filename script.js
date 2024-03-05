// const header = document.querySelector("header");

// window.addEventListener("scroll", function () {
//     header.classList.toggle("sticky", this.window.scrollY > 0);
// });

// let menu = document.querySelector('#menu-icon');
// let navmenu = document.querySelector('.navmenu');

// menu.onclick = () => {
//     menu.classList.toggle('bx-x');
//     navmenu.classList.toggle('open');
// }

// var products = [
//    {
//         id: 1,
//         img: "RedStore_Img/images/product-1.jpg",
//         name: "Half Running Set",
//         price: 400.000,
        
//         status: true,

//     },
//     {
//         id: 2,
//         img: "img/2.jpg",
//         name: "Formal Men Lowers",
//         price: 500.000,
//         status: true,

//     },
//     {
//         id: 3,
//         img: "img/3.jpg",
//         name: "Half Running Suit",
//         price: 600.000,
//         status: true,

//     },
//     {
//         id: 4,
//         img: "img/4.jpg",
//         name: "Half Fancy Lady Dress",
//         price: 700.000,
       
//         status: true,

//     },
//     {
//         id: 5,
//         img: "img/5.jpg",
//         name: "Flix Flox Jeans",
//         price: 700.000,
//         status: true,

//     },
//     {
//         id: 6,
//         img: "img/6.jpg",
//         name: "Fancy Salwar Suits",
//         price: 700.000,
       
//         status: true,

//     },
//     {
//         id: 7,
//         img: "img/7.jpg",
//         name: "Printed Straight Kurta",
//         price: 700.000,
        
//         status: true,

//     },
//     {
//         id: 8,
//         img: "img/8.jpg",
//         name: "Collot Full Dress",
//         price: 700.000,
        
//         status: true,

//     },
// ];

// document.querySelector(".sidebar").style.display = "none";

// function showgiohang() {
//     var x = document.querySelector(".sidebar");
//     if (x.style.display == "block") {
//         x.style.display = "none";
//     } else {
//         x.style.display = "block";
//     }
// }

// const categories = [...new Set(products.map(item => item.promotion))];

// document.getElementById('aa').innerHTML = products.map((item, index) => {
//     var { name, price, img, promotion, status } = item;
//     return `<!-- <div class="row">
//             <div class="col-4">
//                 <img src="${img}" alt="">
//                 <h4>${name}</h4>
                
//                 <div class="rating">
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-regular fa-star"></i>
                    
//                 </div>
                
//                 <p>${price}</p>`+
//             "<button class='btn-cart' onclick='addcart("+(i++)+")'>Mua ngay</button>"

//             +`</div>
//             </div>`;
// }).join('');

// var cart = [];

// function addcart(index) {
//     const selectedProduct = products[index];
//     const existingProduct = cart.find(item => item.id === selectedProduct.id);

//     if (existingProduct) {
//         existingProduct.quantity += 1;
//     } else {
//         cart.push({ ...selectedProduct, quantity: 1 });
//     }

//     displaycart();
// }

// function delcart(index) {
//     cart.splice(index, 1);
//     displaycart();
// }

// function displaycart() {
//     let j = 0;
//     let tong = 0;
//     document.getElementById('count').innerHTML = cart.length;

//     if (cart.length === 0) {
//         document.getElementById('cartItem').innerHTML = "Giỏ Hàng Trống";
//         document.getElementById('tt').innerHTML = tong + " VND";
//     } else {
//         document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
//             var { name, price, img, quantity } = item;
//             tong += price * quantity;
//             return (
//                 `<div class="cart-item">
//                     <div class="row-img">
//                         <img class='rowing' src="${img}">
//                     </div>
//                     <p style='font-size: 14px'>${name}</p>
//                     <h2 style='font-size: 12px'>${price * quantity}.000 VND</h2>
//                     <p style='font-size: 12px'>Số lượng: ${quantity}</p>
//                     <i class='fa-solid fa-trash-can' onclick='delcart(${index})'></i>
//                 </div>`
//             );
//         }).join('');

//         document.getElementById('tt').innerHTML = tong + ".000 VND";
//     }
// }

// function filterProductsByCategory(category) {
//     const filteredProducts = products.filter(item => item.promotion === category || category === 'all');
//     displayProducts(filteredProducts);
// }

// document.getElementById('categoryForm').addEventListener('change', function (event) {
//     const selectedCategory = event.target.value;
//     filterProductsByCategory(selectedCategory);
// });

// function displayProducts(products) {
//     let i = 0;
//     document.getElementById('aa').innerHTML = products.map(item => {
//         var { name, price, img, promotion, status } = item;
//         return `<div class="products" data-category="${promotion}">
//             <div class="row">
//             <a href="products-details.html"><img src="${img}" alt=""></a>
//                 <div class="products-text">
//                     <h5>${promotion}</h5>
//                 </div>
//                 <div class="heart-icon">
//                     <i class='bx bx-heart'></i>
//                 </div>
//                 <div class="ratting">
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bxs-star-half'></i>
//                 </div>
//                 <div class="price">
//                     <h4>${name}</h4>
//                     <p>${price}.000 VND</p>
//                     <button class='btn' onclick='addcart(${i++})'>Thêm Vào Giỏ Hàng</button>
//                 </div>
//             </div>
//         </div>`;
//     }).join('');
// }

// // Hiển thị ban đầu
// displayProducts(products);



const apiUser = "http://localhost:3000/user";
const username = document.querySelector(".input-signup-username");
const password = document.querySelector(".input-signup-password");
const bntSignup = document.querySelector(".signup__signInButton");

// signup
bntSignup.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == "" || password.value == "") {
    alert("Vui lòng điền tên đăng nhập hoặc mật khẩu");
  } else {
    const user = {
      username: username.value,
      password: password.value,
    };
    fetch(apiUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đăng ký thất bại");
        }
        return res.json();
      })
      .then((data) => {
        alert("Đăng ký thành công");
        console.log(data);
      })
      .catch((error) => {
        alert("Đăng nhập thành công");
        console.error("Registration failed:", error.message);
      });
  }
});
