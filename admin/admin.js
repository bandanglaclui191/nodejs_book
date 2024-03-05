document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector('.table');

    function createProductRow(product, index) {
        return `
            <tr>
                <td>${index + 1}</td>
               <td><img src="../${product.img}" alt="" style="max-width: 100px; max-height: 100px;"></td>

                <td>${product.name}</td>
                <td>${product.price}.000VND</td>
                <td>
                    <button class="status completed edit-btn">Sửa</button>
                    <button class="status completed delete-btn" data-id="${product.id}">Xóa</button>
                </td>
            </tr>
        `;
    }

    function loadProducts() {
        fetch('http://localhost:3000/products') 
            .then(response => response.json()) 
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach((product, index) => {
                    const row = createProductRow(product, index);
                    tableBody.innerHTML += row; 
                });
            })
            .catch(error => console.error('Error:', error));
    }

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const productId = event.target.dataset.id;
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
                fetch(`http://localhost:3000/products/${productId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Xóa sản phẩm không thành công');
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Đã xóa sản phẩm thành công');
                    loadProducts();
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                    alert('Đã xảy ra lỗi khi xóa sản phẩm');
                });
            }
        }
    });

    document.getElementById('toggleProductForm').addEventListener('click', function(event) {
        const addProductForm = document.getElementById('addProductForm');
        addProductForm.style.display = addProductForm.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productImageInput = document.getElementById('productImage');
        const productPrice = document.getElementById('productPrice').value;

        const file = productImageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            const productImage = reader.result;

            const newProduct = {name: productName,
                img: productImage,
                price: productPrice
            };

            fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Thêm sản phẩm không thành công');
                }
                return response.json();
            })
            .then(() => {
                alert('Đã thêm sản phẩm thành công');
                loadProducts();
                document.getElementById('addProductForm').reset();
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert('Đã xảy ra lỗi khi thêm sản phẩm');
            });
        };
    });

    loadProducts();
});



// Get the button and form container elements
var toggleButton = document.getElementById("toggleProductForm");
var formContainer = document.getElementById("addProductFormContainer");

// Add click event listener to the button
toggleButton.addEventListener("click", function() {
    // Toggle the visibility of the form container
    if (formContainer.style.display === "none" || formContainer.style.display === "") {
        formContainer.style.display = "block";
    } else {
        formContainer.style.display = "none";
    }
});

// Prevent form submission (just for demonstration purposes)
document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submitted!"); // Just for demonstration
    // You can add your form submission logic here
});
