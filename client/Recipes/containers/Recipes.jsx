import React, { PropTypes } from 'react';
import RecipeList from '../components/RecipeList';
import { Link } from 'react-router'
import _ from 'lodash';
import $ from 'jquery';

// Simple example of a React "smart" component
export default class Recipes extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (this.props.params.recipes) {
            // How to set initial state in ES6 class syntax
            // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
            this.state = { recipes: this.props.params.recipes };
        } else {
            this.state = { 
                recipes: null,
                loading: true
            };
        }
    }
    componentWillMount() {
        if (this.state.loading) {
            $.get('/api/recipes', (data) => {
                this.setState({
                    recipes : data,
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
                    <ol className="breadcrumb">
                        <li className="active">Recipes</li>
                    </ol>
                    <RecipeList recipes={this.state.recipes}/>
                </div>
            );
        }
    }
}
