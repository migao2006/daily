// 初始化 Supabase 客戶端
const supabase = createClient(
  'https://uxjpchtlhietoiwrligm.supabase.co',  // Supabase Base URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80'  // 您的 API 金鑰
);

// 註冊功能
async function register() {
  const email = document.getElementById('register-email').value; // 讀取註冊表單的電子郵件
  const password = document.getElementById('register-password').value; // 讀取註冊表單的密碼

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      showAlert('註冊失敗：' + error.message, 'error'); // 顯示錯誤訊息
    } else {
      showAlert('註冊成功！請登入。', 'success'); // 顯示註冊成功訊息
      document.getElementById('register-form').reset(); // 清空表單
    }
  } catch (err) {
    console.error(err);
    showAlert('註冊過程中發生錯誤：' + err.message, 'error'); // 顯示錯誤訊息
  }
}

// 登入功能
async function login() {
  const email = document.getElementById('login-email').value; // 讀取登入表單的電子郵件
  const password = document.getElementById('login-password').value; // 讀取登入表單的密碼

  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showAlert('登入失敗：' + error.message, 'error'); // 顯示錯誤訊息
    } else {
      showAlert('登入成功！', 'success'); // 顯示登入成功訊息
      showGamePage(); // 顯示遊戲頁面
    }
  } catch (err) {
    console.error(err);
    showAlert('登入過程中發生錯誤：' + err.message, 'error'); // 顯示錯誤訊息
  }
}

// 顯示遊戲頁面
function showGamePage() {
  document.getElementById('login-form').style.display = 'none'; // 隱藏登入表單
  document.getElementById('register-form').style.display = 'none'; // 隱藏註冊表單
  document.getElementById('game-page').style.display = 'block'; // 顯示遊戲頁面
}

// 顯示彈出對話框
function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');
  alertBox.classList.add(type); // 根據訊息類型設定樣式
  alertBox.innerHTML = message;

  // 添加到頁面並顯示
  document.body.appendChild(alertBox);

  // 1秒後自動消失
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// 頁面加載時的初始化函數
window.onload = function() {
  const user = supabase.auth.user();

  if (user) {
    showGamePage(); // 如果已登入，跳轉到遊戲頁面
  }
};
