import React, { PropTypes } from 'react';
import Recipe from './Recipe';
import { Link } from 'react-router'
// Simple example of a React "dumb" component
export default class RecipeList extends React.Component {
    filterTextInput = null;

    constructor(props, context) {
        super(props, context);
        this.state = {
            recipes: this.props.recipes,
            filterText: ''
        };
    }
    onChangeSearch() {
        this.setState({filterText: this.filterTextInput.value});
    }

    render() {
        var recipeNodes = [];
        this.state.recipes.forEach((recipe, idx)  => {
            if (this.state.filterText != '' && recipe.name.toLowerCase().indexOf(this.state.filterText) === -1) {
                return;
            }
            var link = '/recipe/' + recipe.slug;
            recipeNodes.push(
                <div key={idx}>
                    <Link to={link}>
                        <Recipe key={idx} recipe={recipe} id={idx}/>
                    </Link>
                </div>
            );
        });
        return (
            <div className="container">
                <div id="search-box" className="pull-right">
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.state.filterText} placeholder="Search for..." ref={(c) => {this.filterTextInput = c;}} onChange={this.onChangeSearch.bind(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </div>
                <h2>List of recipes</h2>
                {recipeNodes}
            </div>
        );
    }
}
