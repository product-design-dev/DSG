import { useRef, useState } from "react";
import { supabase } from "./supabaseClient";
import { PasswordField } from "./PasswordField";
import "./auth.css";

export function RecoveryScreen({ onComplete }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // See AuthScreen.jsx: a ref-based guard is needed because React state
  // hasn't committed yet if this handler fires more than once in the same
  // tick (e.g. a mashed submit button).
  const submittingRef = useRef(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    setAuthError("");
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        console.error("Error updating password:", error.message);
        setAuthError(error.message);
        return;
      }
      setPassword("");
      setConfirmPassword("");
      onComplete();
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>Set New Password</h1>
      <form onSubmit={handleUpdatePassword}>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          autoComplete="new-password"
        />
        <PasswordField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          autoComplete="new-password"
        />
        {authError && <p className="auth-error">{authError}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
