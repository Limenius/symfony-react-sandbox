import Constants from '../constants/recipesConstants';

const Actions = {
    fetchRecipes: () => {
        return dispatch => {
            dispatch({ type: Constants.RECIPES_FETCHING });

            $.get('/api/recipes', (data) => {
                dispatch({
                    type: Constants.RECIPES_RECEIVED,
                    recipes: data
                });
            });
        };
    },
    fetchRecipe: (slug) => {
        return dispatch => {
            dispatch({ type: Constants.RECIPE_FETCHING });

            $.get('/api/recipes/'+slug, (data) => {
                dispatch({
                    type: Constants.RECIPE_RECEIVED,
                    recipe: data
                });
            });
        };
    }
}

export default Actions;
