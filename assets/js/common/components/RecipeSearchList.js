import React from "react";
import RecipeList from "./RecipeList";

export default class RecipeSearchList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterText: ""
    };
  }

  onChangeSearch(evt) {
    this.setState({ filterText: evt.target.value });
  }

  filterRecipes() {
    return this.props.recipes.filter(recipe => {
      if (
        this.state.filterText !== "" &&
        recipe.name.toLowerCase().indexOf(this.state.filterText) === -1
      ) {
        return false;
      }
      return true;
    });
  }

  render() {
    return (
      <div className="container">
        <div id="search-box" className="pull-right">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={this.state.filterText}
              placeholder="Search for..."
              onChange={this.onChangeSearch.bind(this)}
            />
          </div>
        </div>
        <h2>List of recipes</h2>
        <RecipeList
          recipes={this.filterRecipes()}
          routePrefix={this.props.routePrefix}
        />
      </div>
    );
  }
}
