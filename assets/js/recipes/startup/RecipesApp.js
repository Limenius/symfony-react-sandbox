import React from "react";
import Recipes from "../containers/Recipes";
import Recipe from "../containers/Recipe";
import { Route } from "react-router-dom";

const RecipesApp = ({ initialProps, appContext }) => {
  return (
    <div>
      <Route
        path={"/recipe/:id"}
        render={props => (
          <Recipe {...initialProps} base={appContext.base} {...props} />
        )}
      />
      <Route
        path={"/"}
        exact
        render={props => (
          <Recipes {...initialProps} base={appContext.base} {...props} />
        )}
      />
    </div>
  );
};

export default RecipesApp;
