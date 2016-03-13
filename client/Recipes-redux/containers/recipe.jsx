import React              from 'react';
import Actions from '../actions/recipesActions';
import { connect } from 'react-redux';
import RecipeWidget from '../components/Recipe';
import { Link } from 'react-router';

class Recipe extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.fetchRecipe());
    }
  render() {
    const { store } = this.props;

    if (this.props.fetching) {
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
                </div>
            );
    }
  }
}

const mapStateToProps = (state) => {
    return state.recipes;
};

export default connect(mapStateToProps)(Recipe);
