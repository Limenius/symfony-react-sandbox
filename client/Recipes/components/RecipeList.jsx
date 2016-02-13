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
                    <Link to={link}>
                        <Recipe key={idx} recipe={recipe} id={idx}/>
                    </Link>
                </div>
            );
        });
        return (
            <div className="container">
                <h2>List of recipes</h2>
                {recipeNodes}
            </div>
        );
    }
}
