const client = new Appwrite.Client();
const account = new Appwrite.Account(client);

client
    .setEndpoint("https://cloud.appwrite.io/v1") // 替換為你的 Appwrite API 端點
    .setProject("6755243c0022c2649bf5"); // 替換為你的 Appwrite 專案 ID

// 註冊用戶
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    try {
        await account.create("unique()", email, password);
        document.getElementById("message").innerText = "註冊成功！請登入！";
    } catch (error) {
        document.getElementById("message").innerText = `註冊失敗：${error.message}`;
    }
});

// 登入用戶
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
        await account.createSession(email, password);
        document.getElementById("message").innerText = "登入成功！";
    } catch (error) {
        document.getElementById("message").innerText = `登入失敗：${error.message}`;
    }
});
