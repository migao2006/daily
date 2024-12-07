const BASE_URL = "https://uxjpchtlhietoiwrligm.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const player1Button = document.getElementById("player1");
  const player2Button = document.getElementById("player2");
  const messageDiv = document.getElementById("message");
  const leaderboard = document.getElementById("leaderboard");

  let startTime;
  let isGameActive = false;

  startButton.addEventListener("click", () => {
    messageDiv.textContent = "準備...";
    startButton.disabled = true;

    setTimeout(() => {
      messageDiv.textContent = "開始！點擊按鈕！";
      startTime = Date.now();
      isGameActive = true;
      player1Button.disabled = false;
      player2Button.disabled = false;
    }, Math.random() * 2000 + 1000);
  });

  player1Button.addEventListener("click", () => handlePlayerClick("玩家 1"));
  player2Button.addEventListener("click", () => handlePlayerClick("玩家 2"));

  async function handlePlayerClick(player) {
    if (!isGameActive) return;

    const reactionTime = Date.now() - startTime;
    messageDiv.textContent = `${player} 勝利！反應時間：${reactionTime} ms`;

    // 提交結果到 Supabase
    await submitResult(player, reactionTime);

    // 獲取排行榜
    await fetchLeaderboard();

    // 重置遊戲
    resetGame();
  }

  function resetGame() {
    isGameActive = false;
    startButton.disabled = false;
    player1Button.disabled = true;
    player2Button.disabled = true;
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("提交失敗：", errorText);
        messageDiv.textContent = "提交失敗，請稍後再試！";
      } else {
        console.log("結果成功提交！");
      }
    } catch (error) {
      console.error("提交時發生錯誤：", error);
      messageDiv.textContent = "提交失敗，請檢查網路！";
    }
  }

  async function fetchLeaderboard() {
    try {
      const response = await fetch(`${BASE_URL}/game_results`, {
        method: "GET",
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (response.ok) {
        const results = await response.json();
        leaderboard.innerHTML = results
          .sort((a, b) => a.reaction_time - b.reaction_time)
          .map(
            (result) =>
              `<li>${result.player}: ${result.reaction_time.toFixed(2)} ms</li>`
          )
          .join("");
      } else {
        const errorText = await response.text();
        console.error("無法獲取排行榜：", errorText);
        messageDiv.textContent = "無法獲取排行榜，請稍後再試！";
      }
    } catch (error) {
      console.error("獲取排行榜時發生錯誤：", error);
      messageDiv.textContent = "無法獲取排行榜，請檢查網路！";
    }
  }

  // 初始化排行榜
  fetchLeaderboard();
});
