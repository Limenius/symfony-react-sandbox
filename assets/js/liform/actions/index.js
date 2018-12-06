import Constants from "../constants/recipesConstants";
import jwtDecode from "jwt-decode";

export function login(username, password, baseUrl) {
  return dispatch => {
    let data = new FormData();
    data.append("_username", username);
    data.append("_password", password);

    fetch(baseUrl + "/api/login_check", {
      method: "POST",
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(data => {
        const payload = jwtDecode(data.token);
        let d = new Date(payload.exp * 1000);
        document.cookie =
          "BEARER=" + data.token + "; expires=" + d.toUTCString() + "; path=/";
        dispatch({ type: Constants.LOGIN_TOKEN_RECEIVED, token: data.token });
      })
      .catch(() => {
        dispatch({ type: Constants.LOGIN_ERROR });
      });
  };
}

export function fetchForm(baseUrl, token) {
  return dispatch => {
    fetch(baseUrl + "/admin/api/form", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          type: Constants.FORM_FETCHED,
          initialValues: data.initialValues,
          schema: data.schema
        });
      });
  };
}

export function fetchRecipes(baseUrl) {
  return dispatch => {
    fetch(baseUrl + "/api/recipes", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({ type: Constants.RECIPES_FETCHED, recipes: data });
      });
  };
}
