// Supabase 初始化
const supabaseUrl = 'https://uxjpchtlhietoiwrligm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 註冊用戶並將資料存入 Supabase
async function registerUser() {
  // 彈出對話框讓用戶輸入電子郵件和密碼
  const email = prompt("請輸入您的電子郵件:");
  const password = prompt("請輸入您的密碼:");

  if (email && password) {
    // 註冊操作
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("註冊失敗: " + error.message);  // 顯示錯誤訊息
    } else {
      // 註冊成功，將用戶資料保存到 users 資料表中
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ username: email.split('@')[0], email }]);

      if (insertError) {
        alert("保存用戶資料失敗: " + insertError.message);  // 顯示保存資料失敗的錯誤
      } else {
        alert('註冊成功！您的用戶資料已保存。');  // 顯示註冊成功訊息
      }
    }
  } else {
    alert("請輸入有效的電子郵件和密碼！");  // 如果用戶未填寫，提示錯誤
  }
}

// 登入用戶並提示成功或失敗
async function loginUser() {
  // 彈出對話框讓用戶輸入電子郵件和密碼
  const email = prompt("請輸入您的電子郵件:");
  const password = prompt("請輸入您的密碼:");

  if (email && password) {
    // 登入操作
    const { session, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('登入失敗: ' + error.message);  // 顯示登入失敗訊息
    } else {
      alert('登入成功！');  // 顯示登入成功訊息
    }
  } else {
    alert("請輸入有效的電子郵件和密碼！");  // 如果用戶未填寫，提示錯誤
  }
}
