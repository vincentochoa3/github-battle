import { BattleAction, BattleStateTypes } from "../../types/types";

export function battleReducer(
  state: BattleStateTypes,
  action: BattleAction
): BattleStateTypes {
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
