
// Supabase 初始化
const supabaseUrl = "https://uxjpchtlhietoiwrligm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4anBjaHRsaGlldG9pd3JsaWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzU0MDYsImV4cCI6MjA0ODk1MTQwNn0.Wftfxzh7RNGy5_6SnRfcvfveAKpaIDFUyrwa7N4pW80";

let supabase;
try {
    supabase = supabase.createClient(supabaseUrl, supabaseKey);
    console.log("Supabase 已成功初始化！", supabase);
} catch (error) {
    console.error("Supabase 初始化失敗：", error.message);
    alert("Supabase 初始化失敗，請檢查您的設置。");
}

// 確保 DOM 加載後執行
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM 已加載，開始綁定事件處理程式...");

    // 登入按鈕事件
    document.getElementById("login-button").addEventListener("click", async () => {
        console.log("按鈕已被點擊，開始處理登入事件...");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("輸入的帳號：", username);
        console.log("輸入的密碼：", password);

        if (!username || !password) {
            alert("請填寫完整的帳號和密碼！");
            return;
        }

        alert("正在嘗試登入，請稍候...");
        try {
            const { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("username", username)
                .eq("password", password)
                .single();

            if (error) {
                console.error("登入失敗：", error.message);
                alert("登入失敗：帳號或密碼錯誤");
            } else if (!user) {
                console.error("登入失敗：查無此用戶");
                alert("登入失敗：帳號或密碼錯誤");
            } else {
                console.log("登入成功！用戶資料：", user);
                alert(`登入成功！歡迎，${user.username}`);
                document.getElementById("login-form").style.display = "none";
                document.getElementById("tracker-interface").style.display = "block";
            }
        } catch (err) {
            console.error("系統錯誤：", err.message);
            alert("系統錯誤：" + err.message);
        }
    });

    console.log("事件綁定完成！");
});
