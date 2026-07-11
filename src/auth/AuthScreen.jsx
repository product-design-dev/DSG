import { useState } from "react";
import { supabase } from "./supabaseClient";
import { PasswordField } from "./PasswordField";
import "./auth.css";

export function AuthScreen() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const resetAuthFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthNotice("");
    if (authMode === "signup") {
      if (!firstName.trim() || !lastName.trim()) {
        setAuthError("Please enter your first and last name.");
        return;
      }
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setAuthError("Passwords do not match.");
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { first_name: firstName, last_name: lastName },
          },
        });
      if (signUpError) {
        console.error(
          `Error signing up (status ${signUpError.status}):`,
          signUpError,
        );
        setAuthError(
          signUpError.status >= 500
            ? "Server error while signing up. Check Supabase Auth logs."
            : signUpError.message,
        );
        return;
      }
      if (signUpData.user?.identities?.length === 0) {
        setAuthError(
          "An account with this email already exists. Try logging in or resetting your password.",
        );
        return;
      }
      if (!signUpData.session) {
        resetAuthFields();
        setAuthMode("login");
        setAuthNotice(
          "Account created! Check your email to confirm your account before logging in.",
        );
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error("Error signing in:", signInError.message);
        setAuthError(signInError.message);
        return;
      }
    }
    resetAuthFields();
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    setResetSent(false);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) {
      console.error("Error requesting password reset:", error.message);
      setAuthError(error.message);
      return;
    }
    setResetSent(true);
  };

  if (authMode === "forgot") {
    return (
      <div className="auth-form">
        <h1>Reset Password</h1>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {authError && <p className="auth-error">{authError}</p>}
          {resetSent && (
            <p className="auth-success">
              Check your email for a password reset link.
            </p>
          )}
          <button type="submit">Send Reset Link</button>
        </form>
        <button
          type="button"
          className="auth-toggle"
          onClick={() => {
            setAuthMode("login");
            setAuthError("");
            setResetSent(false);
          }}
        >
          Back to Log In
        </button>
      </div>
    );
  }

  const isSignUp = authMode === "signup";
  return (
    <div className="auth-form">
      <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
      <form onSubmit={handleLogin}>
        {isSignUp && (
          <div className="name-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <PasswordField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        )}
        {authError && <p className="auth-error">{authError}</p>}
        {authNotice && <p className="auth-success">{authNotice}</p>}
        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
      </form>
      {!isSignUp && (
        <button
          type="button"
          className="auth-toggle"
          onClick={() => {
            setAuthMode("forgot");
            setAuthError("");
            setAuthNotice("");
          }}
        >
          Forgot password?
        </button>
      )}
      <button
        type="button"
        className="auth-toggle"
        onClick={() => {
          setAuthMode(isSignUp ? "login" : "signup");
          setAuthError("");
          setAuthNotice("");
        }}
      >
        {isSignUp
          ? "Already have an account? Log In"
          : "Need an account? Sign Up"}
      </button>
    </div>
  );
}
