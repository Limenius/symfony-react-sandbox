import React from 'react'
import Actions from '../actions/recipesActions'
import { connect } from 'react-redux'
import RecipeList from '../components/RecipeList'

class Recipes extends React.Component {
    componentDidMount() {
        if (!this.props.recipes) {
            const { dispatch } = this.props
            dispatch(Actions.fetchRecipes())
        }
    }
    render() {

        if (this.props.fetching || !this.props.recipes) {
            return (
                <div>
                Loading...
                </div>
            )
        } else {
            return (
                <div>
                    <ol className="breadcrumb">
                        <li className="active">Recipes</li>
                    </ol>
                    <RecipeList recipes={this.props.recipes} baseUrl={this.props.baseUrl}/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => (
    {
        recipes: state.recipesState.recipes,
        fetching: state.recipesState.fetching,
        baseUrl: state.recipesState.baseUrl,
    }
)

export default connect(mapStateToProps)(Recipes)
