import { PopularReducerActions, PopularState } from "../../types/types";

export function popularReducer(
  state: PopularState,
  action: PopularReducerActions
) {
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
