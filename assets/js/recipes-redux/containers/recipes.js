import React from "react";
import Actions from "../actions/recipesActions";
import { connect } from "react-redux";
import RecipeSearchList from "../../common/components/RecipeSearchList";

class Recipes extends React.Component {
  componentDidMount() {
    if (!this.props.recipes) {
      const { dispatch } = this.props;
      dispatch(Actions.fetchRecipes(this.props.baseUrl));
    }
  }
  render() {
    if (this.props.fetching || !this.props.recipes) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ol className="breadcrumb">
            <li className="active">Recipes</li>
          </ol>
          <RecipeSearchList recipes={this.props.recipes} routePrefix={""} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  recipes: state.recipesState.recipes,
  fetching: state.recipesState.fetching,
  baseUrl: state.recipesState.baseUrl
});

export default connect(mapStateToProps)(Recipes);
