import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import Recipes from '../containers/recipes'
import Recipe from '../containers/recipe'

const Root = (props) => {
    const baseUrl = props.baseUrl
    return (
        <div>
            <Route path={'/'} exact component={Recipes}/>
            <Route path={'/recipe/:id'} component={Recipe}/>
        </div>
    )
}

export default Root
