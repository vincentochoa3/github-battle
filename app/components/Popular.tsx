import React from "react";
import { fetchPopularRepos, Repo } from "../utils/api";
import LanguagesNav, { Languages } from "./LanguagesNav";
import Loading from "./Loading";
import ReposGrid from "./ReposGrid";

interface PopularState extends Partial<Record<Languages, Repo[]>> {
  error: null | string;
}
type PopularReducerActions =
  | {
      type: "success";
      selectedLanguage: Languages;
      repos: Repo[];
    }
  | { type: "error"; error: Error };
function popularReducer(state: PopularState, action: PopularReducerActions) {
  if (action.type === "success") {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error("Action type isn't supported");
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Languages>("All");
  const [state, dispatch] = React.useReducer(popularReducer, { error: null });
  const fetchedLanguages = React.useRef<string[]>([]);

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
