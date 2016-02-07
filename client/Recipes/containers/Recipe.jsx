import React, { PropTypes } from 'react';
import RecipeWidget from '../components/Recipe';
import _ from 'lodash';

// Simple example of a React "smart" component
export default class Recipe extends React.Component {
    constructor(props, context) {
        super(props, context);

        console.log("in recipe");
        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        this.state = { recipe: this.props.params.recipe };
    }
    render() {
        return (
            <div>
              <RecipeWidget name={this.state.recipe.name}/>
            </div>
        );
    }
}
