
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: username, password });
    if (error) {
      alert('登入失敗，請檢查帳號與密碼');
    } else {
      router.push('/records');
    }
  };

  return (
    <div>
      <h1>登入頁面</h1>
      <form onSubmit={handleLogin}>
        <label>
          帳號：
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          密碼：
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}
