import React, { PropTypes } from 'react';
import Recipe from '../components/Recipe';
// Simple example of a React "dumb" component
export default class RecipeList extends React.Component {

    render() {
        var recipeNodes = this.props.recipes.map(function(recipe, idx) {
            return (
                <Recipe key={idx} name={recipe.name} id={idx}/>
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
