import React from "react";
import Actions from "../actions/recipesActions";
import { connect } from "react-redux";
import RecipeWidget from "../../common/components/Recipe";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  componentDidMount() {
    if (
      !this.props.recipe ||
      this.props.recipe.id.toString() !== this.props.match.params.id
    ) {
      const { dispatch } = this.props;
      dispatch(
        Actions.fetchRecipe(this.props.match.params.id, this.props.baseUrl)
      );
    }
  }

  getRecipe() {
    // if we know that we are loading thata
    if (
      this.props.fetching ||
      // or we do not have a recipe
      !this.props.recipe ||
      // or the recipe we have is not the one we should have
      this.props.recipe.id.toString() !== this.props.match.params.id
    ) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ol className="breadcrumb">
            <li>
              <Link to={"/"}>Recipes</Link>
            </li>
            <li className="active">{this.props.recipe.name}</li>
          </ol>
          <RecipeWidget recipe={this.props.recipe} />
        </div>
      );
    }
  }

  render() {
    return this.getRecipe();
  }
}

const mapStateToProps = state => ({
  recipe: state.recipesState.recipe,
  fetching: state.recipesState.fetching,
  baseUrl: state.recipesState.baseUrl
});

export default connect(mapStateToProps)(Recipe);
