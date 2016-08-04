import React from 'react';
import Actions from '../actions/recipesActions';
import { connect } from 'react-redux';
import RecipeList from '../components/RecipeList';

class Recipes extends React.Component {
    componentDidMount() {
        if (!this.props.recipes) {
            const { dispatch } = this.props;
            dispatch(Actions.fetchRecipes());
        }
    }
    render() {
        const { store } = this.props;

        if (this.props.fetching || !this.props.recipes) {
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
                    <RecipeList recipes={this.props.recipes}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return state.recipes;
};

export default connect(mapStateToProps)(Recipes);
