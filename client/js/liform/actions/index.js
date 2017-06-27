import Constants from '../constants/recipesConstants'

export function login(username, password, baseUrl) {
    return dispatch => {
        var data = new FormData()
        data.append('_username', username)
        data.append('_password', password)

        fetch(baseUrl + '/api/login_check', {
            method: 'POST',
            body: data
        }).then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
            return response.json()
        }).then( (data) => {
            document.cookie = 'BEARER='+data.token+'; expires=Fri, 3 Aug 2021 20:47:11 UTC; path=/'
            dispatch({ type: Constants.LOGIN_TOKEN_RECEIVED, token: data.token })
        }).catch( () => {
            dispatch({ type: Constants.LOGIN_ERROR })
        })
    }
}

export function fetchForm(baseUrl, token) {

    return dispatch => {
        var data = new FormData()
        fetch(baseUrl + '/admin/api/form', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+token,
            },
        }).then( (response) => {
            return response.json()
        }).then( (data) => {
            dispatch({ type: Constants.FORM_FETCHED, initialValues: data.initialValues, schema: data.schema })
        })
    }
}

export function fetchRecipes(baseUrl) {
    return dispatch => {
        var data = new FormData()
        fetch(baseUrl + '/api/recipes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then( (response) => {
            return response.json()
        }).then( (data) => {
            dispatch({ type: Constants.RECIPES_FETCHED, recipes: data })
        })
    }
}
