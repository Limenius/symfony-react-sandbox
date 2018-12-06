import React from "react";
import Recipe from "../../common/components/Recipe";

const RecipeList = props => (
  <div>
    {props.recipes.map((recipe, idx) => (
      <div key={idx}>
        <Recipe key={idx} recipe={recipe} id={idx} />
      </div>
    ))}
  </div>
);

export default RecipeList;
