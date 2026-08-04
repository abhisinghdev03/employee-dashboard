import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  function handleLogin() {
    onLogin();            // flip isLoggedIn in App
    navigate("/", { replace: true });   // go to dashboard, replace login in history
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <p>(Fake login for now — real authentication comes in Phase 8.)</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default LoginPage;