import React              from 'react';
import Actions from '../actions/recipesActions';
import { connect } from 'react-redux';
import RecipeWidget from '../components/Recipe';
import { Link } from 'react-router';

class Recipe extends React.Component {
    componentDidMount() {
        if ( !this.props.recipe || this.props.recipe.slug != this.props.params.slug) {
            const { dispatch } = this.props;
            dispatch(Actions.fetchRecipe(this.props.params.slug));
        }
    }

    getRecipe() {
        // if we know that we are loading thata
        if (this.props.fetching ||
        // or we do not have a recipe
        !this.props.recipe ||
        // or the recipe we have is not the one we should have
        this.props.recipe.slug != this.props.params.slug) {
            return (
                <div>
                Loading...
                </div>
            );
        } else {
            return (
                <div>
                <ol className="breadcrumb">
                <li><Link to='/'>Recipes</Link></li>
                <li className="active">{this.props.recipe.name}</li>
                </ol>
                <RecipeWidget recipe={this.props.recipe}/>
                </div>);
        }
    }

    render() {
        const { store } = this.props;

        return (
            <div>
            {this.getRecipe()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.recipes;
};

export default connect(mapStateToProps)(Recipe);
