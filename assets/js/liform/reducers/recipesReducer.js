import Constants from "../constants/recipesConstants";

export const initialState = {
  recipes: [],
  authToken: null,

  initialValues: null,
  schema: null,
  loginError: null
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RECIPE_ADDED:
      return { ...state, recipes: [action.recipe, ...state.recipes] };
    case Constants.LOGIN_TOKEN_RECEIVED:
      return { ...state, authToken: action.token, loginError: false };
    case Constants.LOGIN_ERROR:
      return { ...state, loginError: true };
    case Constants.FORM_FETCHED:
      return {
        ...state,
        initialValues: action.initialValues,
        schema: action.schema
      };
    case Constants.RECIPES_FETCHED:
      return { ...state, recipes: action.recipes };
    default:
      return state;
  }
}
