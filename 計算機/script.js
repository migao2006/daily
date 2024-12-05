// 初始化顯示區
const screen = document.getElementById("screen");

// 更新顯示區
function appendToExpression(value) {
  if (screen.textContent === "0") {
    screen.textContent = value;  // 如果當前是0，替換為新的值
  } else {
    screen.textContent += value;  // 否則追加數字
  }
}

// 清除顯示區
function clearScreen() {
  screen.textContent = "0";  // 恢復為0
}

// 計算結果並更新顯示
async function calculate() {
  const expression = screen.textContent;
  try {
    // 使用 eval 計算表達式
    const result = eval(expression);  // 注意：eval 有安全風險，僅用於範例
    screen.textContent = result;  // 顯示計算結果

    // 儲存歷史紀錄
    await saveToHistory(expression, result);

    // 更新歷史紀錄
    fetchHistory();
  } catch (error) {
    screen.textContent = "錯誤";  // 如果計算錯誤顯示錯誤訊息
  }
}

// 儲存計算紀錄到 Supabase
async function saveToHistory(expression, result) {
  const { data, error } = await supabase
    .from('history')
    .insert([{ expression, result }]);

  if (error) {
    console.error("無法儲存歷史紀錄：", error);
  }
}

// 獲取歷史紀錄並顯示
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
  historyList.innerHTML = "";  // 清空當前歷史紀錄
  data.forEach(record => {
    const li = document.createElement("li");
    li.textContent = `${record.expression} = ${record.result}`;
    historyList.appendChild(li);
  });
}

// 初始化頁面時載入歷史紀錄
fetchHistory();
