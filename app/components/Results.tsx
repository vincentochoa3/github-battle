import React from "react";
import { battle, Player, User } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import Card from "./Card";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import queryString from "query-string";
import { Link } from "react-router-dom";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
  },
};

function ProfileList({ profile }: { profile: User }) {
  return (
    <ul className="card-list">
      <li>
        <Tooltip text="User's Name">
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
        </Tooltip>
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

interface BattleState {
  loading: boolean;
  error: null | string;
  winner: Player | null;
  loser: Player | null;
}

type BattleAction =
  | { type: "success"; winner: Player; loser: Player }
  | { type: "error"; message: string };

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  if (action.type === "success") {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error("That action type isn't supported.");
  }
}

export default function Results({
  location,
}: {
  location: { search: string };
}) {
  const { playerOne, playerTwo } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    battle([playerOne, playerTwo] as [string, string])
      .then((players) =>
        dispatch({ type: "success", winner: players[0], loser: players[1] })
      )
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading text="Battling" />;
  }

  if (error || !winner || !loser) {
    return (
      <>
        <p className="center-text error">{error}</p>
        <Link to="/battle" className="btn btn-dark btn-space">
          Reset
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>

        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn btn-dark btn-space">
        Reset
      </Link>
    </>
  );
}
