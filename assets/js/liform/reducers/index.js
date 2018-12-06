import recipesReducer from "./recipesReducer";
import { initialState as recipesState } from "./recipesReducer";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// Combine all reducers you may have here
export default combineReducers({
  recipesState: recipesReducer,
  form: formReducer
});

export const initialStates = {
  recipesState
};
