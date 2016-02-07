import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import Recipe from '../components/Recipe';
// Simple example of a React "dumb" component
export default class RecipeList extends React.Component {

    render() {
        var recipeNodes = this.props.recipes.map(function(recipe, idx) {
            return (
                <div key={idx}>
                <Recipe key={idx} name={recipe.name} id={idx}/>
                <Link to='recipe/falafel'>{recipe.slug}</Link>
                </div>
            );
        });
        return (
            <div className="container">
                List of recipes:
                {recipeNodes}
            </div>
        );
    }
}
