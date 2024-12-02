document.addEventListener('DOMContentLoaded', () => {
  // 註冊功能
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('註冊成功！請登入');
      window.location.href = '/login.html';
    });
  }

  // 登入功能
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (email === 'hongyu' && password === '0309') {
        alert('歡迎管理員！');
        window.location.href = '/admin-dashboard.html';
      } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          alert('登入成功！');
          localStorage.setItem('currentUser', JSON.stringify(user));
          window.location.href = '/dashboard.html';
        } else {
          alert('帳號或密碼錯誤！');
        }
      }
    });
  }

  // 登出功能
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login.html';
    });
  }
});
