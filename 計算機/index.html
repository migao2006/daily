<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>按鍵式計算機</title>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f0f0;
      color: #333;
    }

    #container {
      display: flex;
      width: 80%;
      max-width: 1000px;
    }

    #calculator {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    #screen {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      font-size: 1.5rem;
      text-align: right;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: #e9e9e9;
    }

    #buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      width: 100%;
    }

    button {
      height: 50px;
      font-size: 1.2rem;
      border: none;
      border-radius: 5px;
      background: #dcdcdc;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #c0c0c0;
    }

    button:active {
      background: #a9a9a9;
    }

    #history {
      flex: 1;
      margin-left: 20px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      max-height: 400px;
    }

    h2 {
      margin-top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 10px;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <div id="container">
    <div id="calculator">
      <div id="screen"></div>
      <div id="buttons">
        <button onclick="appendToExpression('7')">7</button>
        <button onclick="appendToExpression('8')">8</button>
        <button onclick="appendToExpression('9')">9</button>
        <button onclick="appendToExpression('/')">÷</button>

        <button onclick="appendToExpression('4')">4</button>
        <button onclick="appendToExpression('5')">5</button>
        <button onclick="appendToExpression('6')">6</button>
        <button onclick="appendToExpression('*')">×</button>

        <button onclick="appendToExpression('1')">1</button>
        <button onclick="appendToExpression('2')">2</button>
        <button onclick="appendToExpression('3')">3</button>
        <button onclick="appendToExpression('-')">−</button>

        <button onclick="appendToExpression('0')">0</button>
        <button onclick="appendToExpression('.')">.</button>
        <button onclick="clearScreen()">C</button>
        <button onclick="appendToExpression('+')">+</button>

        <button onclick="calculate()" style="grid-column: span 4; background: #f0f0f0;">=</button>
      </div>
    </div>

    <div id="history">
      <h2>歷史紀錄</h2>
      <ul id="history-list"></ul>
    </div>
  </div>

  <script>
    // 初始化 Supabase
    const supabaseUrl = "https://uxjpchtlhietoiwrligm.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80";
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    const screen = document.getElementById("screen");

    // 更新屏幕
    function appendToExpression(value) {
      screen.textContent += value;
    }

    function clearScreen() {
      screen.textContent = "";
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
  </script>
</body>
</html>
