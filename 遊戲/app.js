// Supabase 初始化
const supabaseUrl = 'https://uxjpchtlhietoiwrligm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 註冊用戶並將資料存入 Supabase
async function registerUser() {
  // 使用對話框提示用戶輸入電子郵件和密碼
  const email = prompt("請輸入您的電子郵件:");
  const password = prompt("請輸入您的密碼:");

  if (email && password) {
    // 註冊操作
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("註冊失敗: " + error.message);
    } else {
      // 註冊成功，將用戶資料保存到 users 資料表中
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ username: email.split('@')[0], email }]);

      if (insertError) {
        alert("保存用戶資料失敗: " + insertError.message);
      } else {
        alert('註冊成功！用戶資料已保存。');
      }
    }
  } else {
    alert("請輸入有效的電子郵件和密碼！");
  }
}

// 登入用戶並提示成功或失敗
async function loginUser() {
  // 使用對話框提示用戶輸入電子郵件和密碼
  const email = prompt("請輸入您的電子郵件:");
  const password = prompt("請輸入您的密碼:");

  if (email && password) {
    // 登入操作
    const { session, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('登入失敗: ' + error.message);
    } else {
      alert('登入成功！');
    }
  } else {
    alert("請輸入有效的電子郵件和密碼！");
  }
}
