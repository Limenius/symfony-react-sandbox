import React, { PropTypes } from 'react';
import RecipeList from '../components/RecipeList';
import _ from 'lodash';

// Simple example of a React "smart" component
export default class Recipes extends React.Component {
    constructor(props, context) {
        super(props, context);

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        this.state = { recipes: this.props.recipes };
    }
    render() {
        return (
            <div>
              <RecipeList recipes={this.state.recipes}/>
            </div>
        );
    }
}
