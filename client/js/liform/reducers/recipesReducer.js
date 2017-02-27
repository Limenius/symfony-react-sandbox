import Constants from '../constants/recipesConstants'

export const initialState = {
    recipes: [],
}

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
    case Constants.RECIPE_ADDED:
        return { ...state, recipes: [ action.recipe, ...state.recipes ] }
    default:
        return state
    }
}
