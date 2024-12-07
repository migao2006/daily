const BASE_URL = "https://uxjpchtlhietoiwrligm.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const messageDiv = document.getElementById("message");

  let startTime;

  startButton.addEventListener("click", () => {
    messageDiv.textContent = "準備...";
    startButton.disabled = true;

    setTimeout(() => {
      messageDiv.textContent = "開始！點擊按鈕！";
      startTime = Date.now();

      document.body.addEventListener("click", recordReaction);
    }, Math.random() * 2000 + 1000); // 隨機延遲 1-3 秒
  });

  async function recordReaction() {
    const reactionTime = Date.now() - startTime;
    messageDiv.textContent = `反應時間：${reactionTime} ms`;

    // 提交反應時間到 Supabase
    await submitResult("玩家", reactionTime);

    // 移除點擊事件，重置遊戲
    document.body.removeEventListener("click", recordReaction);
    startButton.disabled = false;
  }

  async function submitResult(player, reactionTime) {
    try {
      const response = await fetch(`${BASE_URL}/game_results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          player: player,
          reaction_time: reactionTime,
        }),
      });

      if (response.ok) {
        console.log("結果已成功提交！");
      } else {
        console.error("提交失敗：", await response.text());
      }
    } catch (error) {
      console.error("提交時發生錯誤：", error);
    }
  }
});
