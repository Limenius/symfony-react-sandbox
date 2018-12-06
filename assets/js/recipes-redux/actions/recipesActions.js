import Constants from "../constants/recipesConstants";

const Actions = {
  fetchRecipes: baseUrl => dispatch => {
    dispatch({ type: Constants.RECIPES_FETCHING });

    fetch(baseUrl + "/api/recipes")
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Constants.RECIPES_RECEIVED,
          recipes: data
        });
      });
  },

  fetchRecipe: (id, baseUrl) => dispatch => {
    dispatch({ type: Constants.RECIPE_FETCHING });

    fetch(baseUrl + "/api/recipes/" + id)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Constants.RECIPE_RECEIVED,
          recipe: data
        });
      });
  }
};

export default Actions;
