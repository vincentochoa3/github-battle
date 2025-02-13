import React from "react";
import { battle } from "../../utils/api";
import Card from "../Card";
import Loading from "../Loading/Loading";
import queryString from "query-string";
import { Link } from "react-router-dom";
import ProfileList from "./ProfileList";
import { battleReducer } from "./reducer";

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
