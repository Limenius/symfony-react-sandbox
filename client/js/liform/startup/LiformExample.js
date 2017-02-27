import React from 'react'
import ReactOnRails from 'react-on-rails'

import { Provider, connect } from 'react-redux'
import Liform, { processSubmitErrors } from 'liform-react'
import RecipeList from '../components/RecipeList'
import Constants from '../constants/recipesConstants'

const submit = (values, dispatch) =>
{
    return fetch('/liform/recipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( values )
    }).then( (response) => {
        return response.json()
    }).then( (data) => {
        processSubmitErrors(data)
        dispatch({ type: Constants.RECIPE_ADDED, recipe: data })
    })
}

const mainNode = (props) => {

    const store = ReactOnRails.getStore('recipesAdminStore')

    const ConnectedRecipeList = connect((state) => (
        {
            recipes: state.recipesState.recipes,
        }
    ))(RecipeList)

    const reactComponent = (
        <Provider store={store}>
            <div>
                <Liform schema={props.schema} onSubmit={submit} initialValues={props.initialValues}/>
                <ConnectedRecipeList/>
            </div>
        </Provider>
    )
    return reactComponent
}

export default mainNode
