// Thêm sự kiện click vào nút "Mua ngay" và thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    // Tìm sản phẩm trong danh sách sản phẩm
    const product = products.find(item => item.id === productId);
    if (product) {
        // Thêm sản phẩm vào giỏ hàng
        addToCartUI(product);
    }
}

// Thêm sản phẩm vào giỏ hàng
// Biến để lưu trữ tổng tiền
let totalPrice = 0;

// Thêm sản phẩm vào giỏ hàng
function addToCartUI(product) {
    const cartContainer = document.querySelector('.product-cart');
    const totalPriceElement = document.getElementById('totalPrice');

    // Tạo phần tử HTML để hiển thị sản phẩm trong giỏ hàng
    const productHTML = `
        <div class="product-item" data-id="${product.id}">
            <div>
                <img src="${product.img}" alt="">
                <span>${product.name}</span>
            </div>
            <div>
                <span>${product.price}.000 VND</span>
                <button class="remove-btn" onclick="removeFromCart(${product.id}, ${product.price})">Xóa</button>
            </div>
        </div>
    `;

    // Thêm sản phẩm vào giỏ hàng
    cartContainer.insertAdjacentHTML('beforeend', productHTML);

    // Cập nhật tổng tiền
    totalPrice += parseInt(product.price);
    totalPriceElement.textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId, productPrice) {
    // Tìm sản phẩm trong giỏ hàng
    const productItem = document.querySelector(`.product-item[data-id="${productId}"]`);
    if (productItem) {
        // Trừ giá sản phẩm khỏi tổng tiền
        totalPrice -= parseInt(productPrice);
        document.getElementById('totalPrice').textContent = `Tổng Tiền: ${totalPrice}.000 VNĐ`;

        // Xóa sản phẩm khỏi giỏ hàng
        productItem.remove();
    }
}

// Thêm sự kiện click vào nút "Mua ngay" cho mỗi sản phẩm
function addBuyButtonClickEvent() {
    const buyButtons = document.querySelectorAll('.add-cart');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.parentElement.getAttribute('data-id'));
            const product = products.find(item => item.id === productId);
            if (product) {
                addToCartUI(product);
            }
        });
    });
}
