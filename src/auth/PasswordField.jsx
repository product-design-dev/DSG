import { useState } from "react";
import { ShowIcon } from "./icons/ShowIcon";
import { HideIcon } from "./icons/HideIcon";

export function PasswordField({ value, onChange, placeholder = "Password", autoComplete = "current-password" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
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
