// 假設我們已經有一些預設的用戶資料
const users = [
  { email: "user@example.com", password: "password123" }
];

// 登入邏輯
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // 登入成功，將用戶資料儲存到 localStorage 並跳轉到主頁
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    // 登入失敗，顯示錯誤訊息
    document.getElementById('error-message').style.display = 'block';
  }
});

// 在 dashboard.html 中，顯示已登入的用戶資訊
if (window.location.pathname === '/dashboard.html') {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    // 沒有登入的用戶，直接跳轉回登入頁面
    window.location.href = 'login.html';
  } else {
    document.querySelector('h1').textContent = `Welcome, ${user.email}`;
  }

  // 登出邏輯
  document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  });
}
