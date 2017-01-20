import { Match } from 'react-router'
import React from 'react'
import Recipes from '../containers/recipes'
import Recipe from '../containers/recipe'

export default function configureRoutes(store) {
    const baseUrl = store.getState().recipesState.baseUrl + 'redux/'
    return (
        <div>
            <Match pattern={baseUrl} exactly component={Recipes}/>
            <Match pattern={baseUrl+'recipe/:slug'} component={Recipe}/>
        </div>)
}
