// 初始化 Supabase 客戶端
const supabase = createClient(
  'https://uxjpchtlhietoiwrligm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80'
);

// 顯示登入頁面
function showLoginPage() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('game').style.display = 'none';
}

// 登入功能
async function login() {
  const email = prompt('請輸入您的電子郵件');
  const password = prompt('請輸入您的密碼');

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('登入成功！');
    showGamePage();
  }
}

// 註冊功能
async function signup() {
  const email = prompt('請輸入您的電子郵件');
  const password = prompt('請輸入您的密碼');

  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('註冊成功！請登入');
  }
}

// 顯示遊戲頁面
function showGamePage() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

// 創建房間
async function createRoom() {
  const roomName = prompt('請輸入房間名稱');
  const password = prompt('請設定房間密碼');

  const { data, error } = await supabase
    .from('rooms')
    .insert([{ room_name: roomName, password: password }]);

  if (error) {
    alert(error.message);
  } else {
    alert('房間創建成功！');
  }
}

// 加入房間
async function joinRoom() {
  const roomName = prompt('請輸入房間名稱');
  const password = prompt('請輸入房間密碼');

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_name', roomName)
    .eq('password', password)
    .single();

  if (error) {
    alert('房間不存在或密碼錯誤');
  } else {
    alert('成功加入房間！');
  }
}
