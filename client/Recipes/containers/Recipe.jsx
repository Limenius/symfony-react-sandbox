import React, { PropTypes } from 'react';
import RecipeWidget from '../components/Recipe';
import _ from 'lodash';
import { Link } from 'react-router'

// Simple example of a React "smart" component
export default class Recipe extends React.Component {
    constructor(props, context) {
        super(props, context);

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        if (!this.props.params.recipe) {
            this.state = { 
                recipe: null,
                loading: true
            };
        } else {
            this.state = { recipe: this.props.params.recipe };
        }
    }
    componentWillMount() {
        if (this.state.loading) {
            $.get('/api/recipes/'+this.props.params.slug, (data) => {
                this.setState({
                    recipe : data,
                    loading: false
                })
            });
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <div>
                Loading...
                </div>
            );
        } else {
            return (
                <div>
                  <Link to='/'>Recipes</Link> > {this.state.recipe.name}
                  <RecipeWidget name={this.state.recipe.name}/>
                </div>
            );
        }
    }
}
