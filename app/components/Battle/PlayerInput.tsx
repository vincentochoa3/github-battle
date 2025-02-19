import React, { ChangeEvent, FormEvent } from "react";
import ThemeContext from "../../contexts/theme";

export default function PlayerInput({
  onSubmit,
  label,
}: {
  onSubmit: (username: string) => void;
  label: string;
}) {
  const [username, setUsername] = React.useState("");
  const theme = React.useContext(ThemeContext);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(username);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className={`input-${theme}`}
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
