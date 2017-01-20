import React from 'react'
import RecipeWidget from '../../common/components/Recipe'
import { Link } from 'react-router'

// Simple example of a React "smart" component
export default class Recipe extends React.Component {
    constructor(props, context) {
        super(props, context)

        //We check it there is no recipe (only client side)
        //Or our slug doesn't match the recipe that we received server-side
        //
        if (!this.props.recipe || (this.props.params.slug && this.props.params.slug != this.props.recipe.slug)) {
            this.state = {
                recipe: null,
                loading: true
            }
        } else {
            this.state = {
                recipe: this.props.recipe,
                loading: false
            }
        }
    }
    componentWillMount() {
        if (this.state.loading) {
            fetch(this.props.baseUrl + 'api/recipes/' + this.props.params.slug).then((response) => {
                return response.json()
            }).then((data) => {
                this.setState({
                    recipe : data,
                    loading: false
                })
            })
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <div>
                Loading...
                </div>
            )
        } else {
            return (
                <div>
                    <ol className="breadcrumb">
                    <li><Link to={this.props.baseUrl}>Recipes</Link></li>
                    <li className="active">{this.state.recipe.name}</li>
                    </ol>
                    <RecipeWidget recipe={this.state.recipe}/>
                </div>
            )
        }
    }
}
