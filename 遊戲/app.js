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
      alert('註冊失敗：' + error.message); // 顯示錯誤訊息
    } else {
      alert('註冊成功！請登入。'); // 顯示註冊成功訊息
      // 可以自動跳轉到登入頁面或清空表單
      document.getElementById('register-form').reset();
    }
  } catch (err) {
    console.error(err);
    alert('註冊過程中發生錯誤：' + err.message); // 顯示錯誤訊息
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
      alert('登入失敗：' + error.message); // 顯示錯誤訊息
    } else {
      alert('登入成功！'); // 顯示登入成功訊息
      // 跳轉到遊戲頁面或更新頁面
      showGamePage();
    }
  } catch (err) {
    console.error(err);
    alert('登入過程中發生錯誤：' + err.message); // 顯示錯誤訊息
  }
}

// 顯示遊戲頁面
function showGamePage() {
  // 假設這是一個切換頁面功能
  document.getElementById('login-form').style.display = 'none'; // 隱藏登入表單
  document.getElementById('register-form').style.display = 'none'; // 隱藏註冊表單
  document.getElementById('game-page').style.display = 'block'; // 顯示遊戲頁面
}

// 頁面加載時的初始化函數
window.onload = function() {
  // 可以在這裡進行一些初始化操作，例如檢查用戶是否已登入
  const user = supabase.auth.user();

  if (user) {
    showGamePage(); // 如果已登入，跳轉到遊戲頁面
  }
};
