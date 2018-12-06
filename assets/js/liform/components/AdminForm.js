import React from "react";
import { connect } from "react-redux";
import Liform, { processSubmitErrors } from "liform-react";
import RecipeList from "../components/RecipeList";
import Constants from "../constants/recipesConstants";
import { fetchForm, fetchRecipes } from "../actions";

const submit = (baseUrl, token, values, dispatch) =>
  fetch(baseUrl + "/admin/api/recipes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      Authorization: "Bearer " + token
    },
    body: JSON.stringify(values)
  })
    .then(response => response.json())
    .then(data => {
      processSubmitErrors(data);
      dispatch({ type: Constants.RECIPE_ADDED, recipe: data });
    });

const ConnectedRecipeList = connect(state => ({
  recipes: state.recipesState.recipes
}))(RecipeList);

class AdminForm extends React.Component {
  componentDidMount() {
    const { schema, initialValues, baseUrl, dispatch, authToken } = this.props;
    if (!schema || !initialValues) {
      dispatch(fetchForm(baseUrl, authToken));
      dispatch(fetchRecipes(baseUrl, authToken));
    }
  }

  render() {
    const { schema, initialValues, baseUrl, authToken } = this.props;
    if (schema) {
      return (
        <div>
          <Liform
            schema={schema}
            onSubmit={submit.bind(this, baseUrl, authToken)}
            initialValues={initialValues}
          />
          <ConnectedRecipeList />
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default connect(state => ({
  schema: state.recipesState.schema,
  initialValues: state.recipesState.initialValues,
  baseUrl: state.recipesState.baseUrl,
  authToken: state.recipesState.authToken
}))(AdminForm);
