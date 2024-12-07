const BASE_URL = "https://uxjpchtlhietoiwrligm.supabase.co";
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
    await submitResult(player, reactionTime);
    await fetchLeaderboard();
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
        body: JSON.stringify({ player, reaction_time: reactionTime }),
      });

      if (!response.ok) {
        console.error("提交失敗：", await response.text());
      }
    } catch (error) {
      console.error("提交時出錯：", error);
    }
  }

  async function fetchLeaderboard() {
    try {
      const response = await fetch(`${BASE_URL}/game_results`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (response.ok) {
        const results = await response.json();
        leaderboard.innerHTML = results
          .sort((a, b) => a.reaction_time - b.reaction_time)
          .map((result) => `<li>${result.player}: ${result.reaction_time} ms</li>`)
          .join("");
      } else {
        console.error("無法獲取排行榜：", await response.text());
      }
    } catch (error) {
      console.error("獲取排行榜時出錯：", error);
    }
  }

  fetchLeaderboard();
});
