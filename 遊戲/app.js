// 初始化 Supabase 客戶端
const supabaseUrl = 'https://uxjpchtlhietoiwrligm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 顯示提示框
function showAlert(message, type) {
  const alertBox = document.getElementById('alert-box');
  alertBox.innerText = message;
  alertBox.classList.add(type);  // success 或 error 類別
  alertBox.style.display = 'block';
  
  setTimeout(() => {
    alertBox.style.display = 'none';
    alertBox.classList.remove(type);
  }, 3000);
}

// 註冊函數
async function register() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    showAlert(error.message, 'error');
  } else {
    showAlert('註冊成功！請檢查您的郵件以完成驗證。', 'success');
    switchToLogin();
  }
}

// 登入函數
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    showAlert(error.message, 'error');
  } else {
    showAlert('登入成功！', 'success');
    showGamePage();
  }
}

// 切換到登入頁面
function switchToLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// 切換到註冊頁面
function switchToRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

// 顯示遊戲頁面
function showGamePage() {
  document.getElementById('game-page').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';
}

// 事件處理
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('switch-to-login').addEventListener('click', switchToLogin);
document.getElementById('switch-to-register').addEventListener('click', switchToRegister);
