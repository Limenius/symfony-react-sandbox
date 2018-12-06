import React from "react";

const Recipe = props => (
  <div>
    <h3>{props.recipe.name}</h3>
    <div className="thumbnail">
      <div className="row">
        <div className="col-md-3">
          <img
            src={"/images/" + props.recipe.image}
            className="img-responsive"
            alt={props.recipe.name}
          />
        </div>
        <div className="col-md-9">
          <p className="recipe-body">{props.recipe.description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Recipe;
