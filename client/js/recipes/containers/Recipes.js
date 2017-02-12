import React from 'react'
import RecipeList from '../../common/components/RecipeList'

// Simple example of a React "smart" component
export default class Recipes extends React.Component {

    constructor(props, context) {
        super(props, context)
        if (this.props.recipes) {
            this.state = {
                recipes: this.props.recipes,
                loading: false,
            }
        } else {
            this.state = {
                recipes: null,
                loading: true
            }
        }
    }

    componentDidMount() {
        if (this.state.loading) {
            fetch(this.props.baseUrl + 'api/recipes').then((response) => {
                return response.json()
            }).then((data) => {
                this.setState({
                    recipes : data,
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
                        <li className="active">Recipes</li>
                    </ol>
                    <RecipeList recipes={this.state.recipes} routePrefix={this.props.baseUrl}/>
                </div>
            )
        }
    }
}
