import Constants from '../constants/recipesConstants';

export const initialState = {
    recipes: null,
    recipe: null,
    fetching: false,
    baeUrl: '/',
    location: '/',
};

export default function recipesReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.RECIPES_FETCHING:
            return { ...state, fetching: true};

        case Constants.RECIPES_RECEIVED:
            return { ...state, recipe: null, recipes: action.recipes, fetching: false };

        case Constants.RECIPE_FETCHING:
            return { ...state, fetching: true };

        case Constants.RECIPE_RECEIVED:
            return { ...state, recipes: null, recipe: action.recipe, fetching: false };

        default:
            return state;
    }
}
