import React from "react";
import Recipes from "../containers/Recipes";
import Recipe from "../containers/Recipe";
import { renderToString } from "react-dom/server";
import { BrowserRouter, StaticRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

const RecipesApp = ({initialProps, appContext}) => {
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
        render={props => {
          return <Recipes {...initialProps} base={appContext.base} {...props} />;
        }}
      />
    </div>
  );
};

export default RecipesApp;