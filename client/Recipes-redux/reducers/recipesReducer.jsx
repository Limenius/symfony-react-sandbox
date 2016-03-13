import Constants from '../constants/recipesConstants';

const initialState = {
  recipes: [],
  recipe: null,
  fetching: true,
};

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RECIPES_FETCHING:
      return { ...state, fetching: true };

    case Constants.RECIPES_RECEIVED:
      return { ...state, recipes: action.recipes, fetching: false };

    case Constants.RECIPE_FETCHING:
      return { ...state, fetching: true };

    case Constants.RECIPE_RECEIVED:
      return { ...state, recipe: action.recipe, fetching: false };

    default:
      return state;
  }
}
