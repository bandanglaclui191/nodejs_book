const apiUrl = "http://localhost:3000/order"; // Đường dẫn của API đơn hàng
const btncheck = document.querySelector('.btncheck');

btncheck.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của nút

    // Lấy giá trị từ các trường input sau khi người dùng đã nhập
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    // Lấy thông tin giỏ hàng từ localStorage
    let cart = localStorage.getItem('cart');
    if (!cart) {
        alert("Giỏ hàng của bạn trống.");
        return; // Thoát khỏi hàm nếu giỏ hàng trống
    }

    // Chuyển đổi chuỗi JSON của giỏ hàng thành mảng
    cart = JSON.parse(cart);

    // Tạo một đối tượng đơn hàng
    const order = {
        user: user,
        email: email,
        address: address,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
        products: cart // Thêm mảng sản phẩm vào đơn hàng
    };

    // Gửi đơn hàng đến API
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Gửi đơn hàng thất bại.");
        }
        return res.json();
    })
  .then((data) => {
   
    console.log(data);

    
    
        window.location.href = "index.html";
    
})


    .catch((error) => {
        alert("Gửi đơn hàng thất bại");
        console.error("Lỗi khi gửi đơn hàng:", error.message);
    });
});

