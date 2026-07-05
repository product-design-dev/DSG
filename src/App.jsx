import { useEffect, useState } from "react";
import { supabase } from "./supabase-clinet";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [newBrand, setNewBrand] = useState({ name: "" });
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
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
    setEmail("");
    setPassword("");
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

  if (!session) {
    return (
      <div className="auth-form">
        <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {authError && <p className="auth-error">{authError}</p>}
          <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
        <button
          type="button"
          className="auth-toggle"
          onClick={() => {
            setIsSignUp((prev) => !prev);
            setAuthError("");
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
                Edit asdf
              </button>
              <button type="button" onClick={() => handleDelete(brand.id)}>
                Delete
              </button>
            </li>
          ),
        )}
      </ul>
    </>
  );
}

export default App;
