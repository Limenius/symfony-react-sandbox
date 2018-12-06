import React from "react";
import RecipeWidget from "../../common/components/Recipe";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Simple example of a React "smart" component
export default class Recipe extends React.Component {
  constructor(props, context) {
    super(props, context);

    //We check it there is no recipe (only client side)
    //Or our id doesn't match the recipe that we received server-side
    //
    if (
      !this.props.recipe ||
      (this.props.match.params.id &&
        this.props.match.params.id !== this.props.recipe.id)
    ) {
      this.state = {
        recipe: null,
        loading: true
      };
    } else {
      this.state = {
        recipe: this.props.recipe,
        loading: false
      };
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      fetch(this.props.base + "/api/recipes/" + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
          this.setState({
            recipe: data,
            loading: false
          });
        });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Helmet>
            <title>{this.state.recipe.name}</title>
          </Helmet>
          <ol className="breadcrumb">
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li className="active">{this.state.recipe.name}</li>
          </ol>
          <RecipeWidget recipe={this.state.recipe} />
        </div>
      );
    }
  }
}
