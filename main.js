fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(products);

        // Lấy dữ liệu sản phẩm
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                displayProducts(products);
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu sản phẩm:', error));
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu danh mục:', error));
    

function displayProducts(products) {
    let i = 0;
    document.getElementById('row').innerHTML = products.map(item => {
        let { id, name, price, img, status } = item;
        return `<div class="col-4">
            <a href="detail.html"><img src="${img}" alt=""></a>
            <h4>${name}</h4>
            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <p>${price}.000 VND</p>
            <button onclick='addToCart("${id}","${name}","${price}","${img}")' class="button add-cart">
                <span class="button_lg">
                    <span class="button_sl"></span>
                    <span class="button_text" >Mua ngay</span>
                </span>
            </button>
        </div>`;
    }).join('');
}

document.querySelector(".shopping").style.display = "none";

function showgiohang() {
    var x = document.querySelector(".shopping");
    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

loadCartUI()

    function addToCart(id, name, price, img) {
        // Tạo một đối tượng để biểu diễn sản phẩm
        const product = {
            id: id,
            name: name,
            price: price,
            img: img,
            quantity: 1 // Số lượng mặc định khi thêm vào giỏ hàng
        };

        // Kiểm tra xem giỏ hàng đã tồn tại trong localStorage chưa
        let cart = localStorage.getItem('cart');
        if (!cart) {
            // Nếu chưa có, tạo một giỏ hàng mới và thêm sản phẩm vào đó
            cart = [];
            cart.push(product);
        } else {
            // Nếu đã có, chuyển đổi chuỗi JSON của giỏ hàng thành mảng
            cart = JSON.parse(cart);

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProductIndex = cart.findIndex(item => item.id === id);
            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                cart[existingProductIndex].quantity += 1;
            } else { // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
                cart.push(product);
            }
        }

        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // In ra thông tin sản phẩm đã được thêm vào giỏ hàng (optional)
        console.log('Product added to cart:', product);
        loadCartUI();
        // Cập nhật tổng tiền sau khi thêm vào giỏ hàng
        updateTotalPrice(cart);
    }

    function removeItem(id) {
        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
            const updatedCart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            loadCartUI();
            // Tính lại tổng tiền sau khi xóa sản phẩm
            updateTotalPrice(updatedCart);
        }
    }

    // Hàm tính lại tổng tiền
    function updateTotalPrice(cart) {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        document.getElementById('totalPrice').textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;
    }

    // Thay đổi hàm loadCartUI để bao gồm nút "Xóa sản phẩm" và tính toán tổng tiền
    // Hàm loadCartUI để hiển thị giỏ hàng
    function loadCartUI() {
        const cartContainer = document.querySelector('.product-cart');
        let totalPrice = 0; // Khởi tạo biến tổng tiền

        // Kiểm tra xem có giỏ hàng trong localStorage không
        let cart = localStorage.getItem('cart');
        if (!cart) {
            // Nếu không có giỏ hàng, hiển thị thông báo giỏ hàng trống
            cartContainer.innerHTML = "<p>Giỏ hàng của bạn trống.</p>";
        } else {
            // Nếu có giỏ hàng, chuyển đổi chuỗi JSON của giỏ hàng thành mảng
            cart = JSON.parse(cart);

            if (cart.length === 0) {
                // Hiển thị thông báo giỏ hàng trống
                cartContainer.innerHTML = "<p>Giỏ hàng của bạn trống.</p>";
            } else {
                // Nếu có sản phẩm trong giỏ hàng, hiển thị chi tiết sản phẩm bằng table
                let tableHTML = "<table><thead><tr><th>Ảnh</th><th>Tên sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Tổng</th><th>Xóa</th></tr></thead><tbody>";

                cart.forEach(item => {
                    const totalPricePerItem = item.price * item.quantity;
                    totalPrice += totalPricePerItem; // Cộng tổng tiền của từng sản phẩm vào tổng tiền của giỏ hàng
                    tableHTML += `<tr><td><img src="${item.img}" alt="${item.name}" style="width: 50px;"></td><td>${item.name}</td><td>${item.price}.000 VND</td><td>${item.quantity}</td><td>${totalPricePerItem}.000 VND</td><td><button class="remove-btn" onclick="removeItem('${item.id}')">Xóa</button></td></tr>`;
                });

                tableHTML += "</tbody></table>";// Hiển thị bảng chi tiết sản phẩm trong giỏ hàng
                cartContainer.innerHTML = tableHTML;

                // Hiển thị tổng tiền của giỏ hàng
                document.getElementById('totalPrice').textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;
            }
        }
    }