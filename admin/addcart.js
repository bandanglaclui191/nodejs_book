// document.addEventListener("DOMContentLoaded", function () {
//     const tableBody = document.querySelector('.table-data tbody');

//     // Function to create a new product row in the table
//     function createProductRow(product, index) {
//         return `
//             <tr>
//                 <td>${index + 1}</td>
//                 <td><img src="${product.img}" alt=""></td>
//                 <td>${product.name}</td>
//                 <td>${product.price}.000VND</td>
//                 <td>
//                     <button class="status completed edit-btn">Sửa</button>
//                     <button class="status completed delete-btn" data-id="${product.id}">Xóa</button>
//                 </td>
//             </tr>
//         `;
//     }

//     // Function to load products from server and display them in the table
//     function loadProducts() {
//         fetch('http://localhost:3000/products') 
//             .then(response => response.json()) 
//             .then(data => {
//                 tableBody.innerHTML = ''; // Clear old rows before adding new ones
//                 data.forEach((product, index) => {
//                     const row = createProductRow(product, index);
//                     tableBody.innerHTML += row; 
//                 });
//             })
//             .catch(error => console.error('Error:', error));
//     }

//     // Event listener for the delete button
//     tableBody.addEventListener('click', function(event) {
//         // Implementation of delete button event listener
//     });

//     // Event listener for the "thêm sản phẩm" button to toggle the add product form
//     document.getElementById('toggleProductForm').addEventListener('click', function(event) {
//         const addProductForm = document.getElementById('addProductForm');
//         addProductForm.style.display = addProductForm.style.display === 'none' ? 'block' : 'none';
//     });

//     // Event listener for form submission to add a new product
//     document.getElementById('addProductForm').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent default form submission
//         const productName = document.getElementById('productName').value;
//         const productImage = document.getElementById('productImage').value.split("\\").pop(); // Extract data from form
//         const productPrice = document.getElementById('productPrice').value;

//         const newProduct = {
//             name: productName,
//             img: productImage,
//             price: productPrice
//         };

//         fetch('http://localhost:3000/products', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newProduct)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Thêm sản phẩm không thành công');
//             }
//             return response.json();
//         })
//         .then(() => {
//             alert('Đã thêm sản phẩm thành công');
//             loadProducts(); // Reload the product list after adding
//             document.getElementById('addProductForm').reset(); // Reset the form after submission
//         })
//         .catch(error => {
//             console.error('Lỗi:', error);
//             alert('Đã xảy ra lỗi khi thêm sản phẩm');
//         });
//     });

//     // Initially load the product list when the page is loaded
//     loadProducts();
// });