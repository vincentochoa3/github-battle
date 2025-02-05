import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import ThemeContext from "../../contexts/theme";
import { Link } from "react-router-dom";
import Instructions from "./Instructions";
import PlayerInput from "./PlayerInput";

function PlayerPreview({
  username,
  onReset,
  label,
}: {
  label: string;
  username: string;
  onReset: () => void;
}) {
  const theme = React.useContext(ThemeContext);
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState("");
  const [playerTwo, setPlayerTwo] = React.useState("");

  const handleSubmit = (id: string, player: string) =>
    id === "playerOne" ? setPlayerOne(player) : setPlayerTwo(player);

  const handleReset = (id: string) =>
    id === "playerOne" ? setPlayerOne("") : setPlayerTwo("");

  return (
    <>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === "" ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("playerOne", player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset("playerOne")}
            />
          )}
          {playerTwo === "" ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset("playerTwo")}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className="btn btn-dark btn-space"
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </>
  );
}
