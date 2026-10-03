import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "./api";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (localStorage.getItem("token")) return <Navigate to="/dashboard" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={submit}>
        <h2>Log in</h2>
        <input
          className="text-input"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="text-input"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button-login" type="submit" disabled={busy || !username || !password}>
          {busy ? "…" : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;