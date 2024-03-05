let apiUser = "http://localhost:3000/user";

//login
const username = document.querySelector(".input-login-username");
const password = document.querySelector(".input-login-password");
const bntLogin = document.querySelector(".login__signInButton");

// get user
const getUser = async () => {
  const response = await fetch(apiUser);
  const data = await response.json();
  return data;
};

// login
bntLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  if (username.value == "" || password.value == "") {
    alert("Vui lòng nhập tài khoản hoặc mật khẩu của bạn");
  } else {
    try {
      const data = await getUser(); 
      const user = data.find(
        (user) =>
          user.username === username.value && user.password === password.value // Sử dụng 'pass' thay vì 'password'
      );
      if (user) {
        if (user.role === "admin") {
          alert("Đăng nhập thành công với vai trò Admin");
          window.location.href = "admin/admin.html";

        } else {
          alert("Đăng nhập thành công");
          window.location.href = "check.html";
        }
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      alert("Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại sau");
    }
  }
});



