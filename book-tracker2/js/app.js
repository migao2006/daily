// 註冊邏輯
document.getElementById('register-form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // 儲存帳號資料
  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
  
  // 註冊成功後跳轉到登入頁面
  alert('Registration successful! Please login.');
  window.location.href = 'login.html';
});

// 登入邏輯
document.getElementById('login-form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // 取得儲存在 localStorage 的用戶資料
  const storedUser = JSON.parse(localStorage.getItem('user'));
  
  // 驗證帳號密碼
  if (storedUser && storedUser.email === email && storedUser.password === password) {
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('error-message').style.display = 'block';
  }
});

// 登出邏輯
if (window.location.pathname === '/dashboard.html') {
  document.getElementById('logout')?.addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  });
}
