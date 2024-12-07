// Supabase 初始化
const supabaseUrl = 'https://uxjpchtlhietoiwrligm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 註冊用戶
async function registerUser() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert('註冊失敗: ' + error.message);
  } else {
    alert('註冊成功！請檢查您的電子郵件來驗證帳戶。');
  }
}

// 登入用戶
async function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert('登入失敗: ' + error.message);
  } else {
    alert('登入成功！');
  }
}
