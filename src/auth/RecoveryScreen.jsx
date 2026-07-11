import { useState } from "react";
import { supabase } from "./supabaseClient";
import { PasswordField } from "./PasswordField";
import "./auth.css";

export function RecoveryScreen({ onComplete }) {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error("Error updating password:", error.message);
      setAuthError(error.message);
      return;
    }
    setPassword("");
    onComplete();
  };

  return (
    <div className="auth-form">
      <h1>Set New Password</h1>
      <form onSubmit={handleUpdatePassword}>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        {authError && <p className="auth-error">{authError}</p>}
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
