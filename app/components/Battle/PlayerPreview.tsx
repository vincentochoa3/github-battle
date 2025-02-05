import PropTypes from "prop-types";
import React from "react";
import ThemeContext from "../../contexts/theme";
import { FaTimesCircle } from "react-icons/fa";

export default function PlayerPreview({
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
