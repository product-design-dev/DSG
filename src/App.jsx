import { useEffect, useState } from "react";
import { supabase } from "./supabase-clinet";
import { ShowIcon } from "./icons/ShowIcon";
import { HideIcon } from "./icons/HideIcon";
import "./App.css";

function PasswordField({ value, onChange, placeholder = "Password" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <HideIcon size={20} /> : <ShowIcon size={20} />}
      </button>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null);
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

  const [newBrand, setNewBrand] = useState({ name: "" });
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [deletingBrand, setDeletingBrand] = useState(null);

  useEffect(() => {
    if (!deletingBrand) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDeletingBrand(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deletingBrand]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (event === "PASSWORD_RECOVERY") {
          setAuthMode("recovery");
        }
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

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
    setAuthMode("login");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from("brand")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching brands", error.message);
      return;
    }
    setBrands(data);
  };

  useEffect(() => {
    if (session) {
      fetchBrands();
    } else {
      setBrands([]);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("brand").insert(newBrand);

    if (error) {
      console.error("Error adding brand", error.message);
      return;
    }
    setNewBrand({ name: "" });
    fetchBrands();
  };

  const startEditing = (brand) => {
    setEditingId(brand.id);
    setEditingName(brand.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("brand")
      .update({ name: editingName })
      .eq("id", id);

    if (error) {
      console.error("Error updating brand", error.message);
      return;
    }
    cancelEditing();
    fetchBrands();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("brand").delete().eq("id", id);

    if (error) {
      console.error("Error deleting brand", error.message);
      return;
    }
    fetchBrands();
  };

  const confirmDelete = async () => {
    if (!deletingBrand) return;
    await handleDelete(deletingBrand.id);
    setDeletingBrand(null);
  };

  if (authMode === "recovery") {
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

  if (!session) {
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

  return (
    <>
      <div className="topbar">
        <span>{session.user.email}</span>
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Brand Name"
          value={newBrand.name}
          onChange={(e) =>
            setNewBrand((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <button type="submit">Add Brand</button>
      </form>
      <ul>
        {brands.map((brand) =>
          editingId === brand.id ? (
            <li key={brand.id}>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
              />
              <button type="button" onClick={() => handleUpdate(brand.id)}>
                Save
              </button>
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
            </li>
          ) : (
            <li key={brand.id}>
              {brand.name}
              <button type="button" onClick={() => startEditing(brand)}>
                Edit
              </button>
              <button type="button" onClick={() => setDeletingBrand(brand)}>
                Delete
              </button>
            </li>
          ),
        )}
      </ul>
      {deletingBrand && (
        <div
          className="modal-overlay"
          onClick={() => setDeletingBrand(null)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-brand-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-brand-title">Delete Brand</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingBrand.name}</strong>? This can&apos;t be
              undone.
            </p>
            <div className="modal-actions">
              <button type="button" onClick={() => setDeletingBrand(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="modal-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
