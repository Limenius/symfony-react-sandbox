import { Route } from "react-router-dom";
import React from "react";
import Recipes from "../containers/recipes";
import Recipe from "../containers/recipe";

const Root = () => {
  return (
    <div>
      <Route path={"/"} exact component={Recipes} />
      <Route path={"/recipe/:id"} component={Recipe} />
    </div>
  );
};

export default Root;
