import React, { PropTypes } from 'react';
import Recipe from '../components/Recipe';
import { Link } from 'react-router'
// Simple example of a React "dumb" component
export default class RecipeList extends React.Component {

    render() {
        var recipeNodes = this.props.recipes.map(function(recipe, idx) {
            var link = '/recipe/' + recipe.slug;
            return (
                <div key={idx}>
                <Recipe key={idx} name={recipe.name} id={idx}/>
                <Link to={link}>{recipe.name}</Link>
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
