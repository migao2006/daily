// 初始化 Supabase
const supabaseUrl = "https://uxjpchtlhietoiwrligm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const screen = document.getElementById("screen");

// 更新屏幕
function appendToExpression(value) {
  if (screen.textContent === "0") {
    screen.textContent = value;
  } else {
    screen.textContent += value;
  }
}

function clearScreen() {
  screen.textContent = "0";
}

async function calculate() {
  const expression = screen.textContent;
  try {
    const result = eval(expression); // 注意：eval 有安全風險，僅用於範例
    screen.textContent = result;

    // 保存到 Supabase
    await supabase.from('history').insert([{ expression, result }]);

    // 更新歷史紀錄
    fetchHistory();
  } catch (error) {
    screen.textContent = "錯誤";
  }
}

// 獲取歷史紀錄
async function fetchHistory() {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    console.error("無法獲取歷史紀錄：", error);
    return;
  }

  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  data.forEach(record => {
    const li = document.createElement("li");
    li.textContent = `${record.expression} = ${record.result}`;
    historyList.appendChild(li);
  });
}

// 初始化載入歷史紀錄
fetchHistory();
