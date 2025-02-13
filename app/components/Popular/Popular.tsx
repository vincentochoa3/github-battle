import React from "react";
import { fetchPopularRepos } from "../../utils/api";
import LanguagesNav from "../LanguagesNav";
import Loading from "../Loading/Loading";
import ReposGrid from "../ReposGrid";
import { Languages } from "../../types/types";
import { popularReducer } from "./reducer";

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Languages>("All");
  const [state, dispatch] = React.useReducer(popularReducer, { error: null });
  const fetchedLanguages = React.useRef<Languages[]>([]);

  React.useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: "success", selectedLanguage, repos }))
        .catch((error) => dispatch({ type: "error", error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;
  const selectedRepos = state[selectedLanguage];
  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching Repos" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {selectedRepos && <ReposGrid repos={selectedRepos} />}
    </>
  );
}
