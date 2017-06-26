import Constants from '../constants/recipesConstants'

const Actions = {
    fetchRecipes: (baseUrl) => {
        console.log(baseUrl)
        return dispatch => {
            dispatch({ type: Constants.RECIPES_FETCHING })

            fetch(baseUrl + '/api/recipes').then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({
                    type: Constants.RECIPES_RECEIVED,
                    recipes: data
                })
            })
        }
    },

    fetchRecipe: (id, baseUrl) => {
        console.log(id)
        console.log(baseUrl)
        return dispatch => {
            dispatch({ type: Constants.RECIPE_FETCHING })

            fetch(baseUrl + '/api/recipes/' + id).then((response) => {
                return response.json()
            }).then((data) => {
                dispatch({
                    type: Constants.RECIPE_RECEIVED,
                    recipe: data
                })
            })
        }
    }
}

export default Actions
