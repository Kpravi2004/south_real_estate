import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  DEV CREDENTIALS (change for production or use backend)
  ADMIN_ID: admin@sdre
  ADMIN_PASS: Admin@123
  ADMIN_SECRET: SDRE-SECRET-2025
*/

const ADMIN_ID = "minnal_rishon";
const ADMIN_PASS = "Rishon@2006";
const ADMIN_SECRET = "trusted_seller";

const LOCK_THRESHOLD = 5; // attempts
const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export default function AdminLogin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(
    Number(localStorage.getItem("adminAttempts") || 0)
  );
  const [lockedUntil, setLockedUntil] = useState(
    Number(localStorage.getItem("adminLockUntil") || 0)
  );

  useEffect(() => {
    // Clear expired lock
    const now = Date.now();
    if (lockedUntil && now > lockedUntil) {
      localStorage.removeItem("adminLockUntil");
      localStorage.removeItem("adminAttempts");
      setLockedUntil(0);
      setAttempts(0);
    }
  }, [lockedUntil]);

  const isLocked = () => {
    const until = Number(localStorage.getItem("adminLockUntil") || 0);
    return until && Date.now() < until;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (isLocked()) {
      const until = Number(localStorage.getItem("adminLockUntil"));
      const secLeft = Math.ceil((until - Date.now()) / 1000);
      setError(`Too many attempts. Try again in ${secLeft} seconds.`);
      return;
    }

    // Basic validation
    if (!userId || !password || !secret) {
      setError("All fields are required.");
      return;
    }

    // Check credentials (client-side dev check)
    if (
      userId.trim() === ADMIN_ID &&
      password === ADMIN_PASS &&
      secret.trim() === ADMIN_SECRET
    ) {
      // success
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.removeItem("adminAttempts");
      localStorage.removeItem("adminLockUntil");
      setAttempts(0);
      navigate("/admin/dashboard");
    } else {
      // failed
      const newAttempts = attempts + 1;
      localStorage.setItem("adminAttempts", String(newAttempts));
      setAttempts(newAttempts);

      if (newAttempts >= LOCK_THRESHOLD) {
        const until = Date.now() + LOCK_DURATION_MS;
        localStorage.setItem("adminLockUntil", String(until));
        setLockedUntil(until);
        setError(
          `Too many failed attempts. Locked for ${Math.round(
            LOCK_DURATION_MS / 60000
          )} minutes.`
        );
      } else {
        setError(
          `Invalid credentials. Attempts: ${newAttempts}/${LOCK_THRESHOLD}`
        );
      }
    }
  };

  return (
    <div className="admin-login-viewport">
      <div className="admin-login-card" role="main" aria-labelledby="loginTitle">
        <h1 id="loginTitle">Admin Portal</h1>
        <p className="muted">Secure access — enter your credentials</p>

        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          <label>
            Admin User ID
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="admin@sdre"
              autoComplete="off"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="new-password"
              required
            />
          </label>

          <label>
            Secret Code
            <input
              type="text"
              name="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="SDRE-SECRET-2025"
              autoComplete="off"
              required
            />
          </label>

          {error && <div className="login-error" role="alert">{error}</div>}

          <div className="login-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={isLocked()}
              aria-disabled={isLocked()}
            >
              Sign In
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setUserId("");
                setPassword("");
                setSecret("");
                setError("");
              }}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="login-foot">
          <small>Attempts: {attempts}/{LOCK_THRESHOLD}</small>
        </div>
      </div>
    </div>
  );
}
