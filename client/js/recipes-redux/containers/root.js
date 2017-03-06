import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import Recipes from '../containers/recipes'
import Recipe from '../containers/recipe'

const Root = (props) => {
    const baseUrl = props.baseUrl + 'redux/'
    return (
        <div>
            <Route path={baseUrl} exact component={Recipes}/>
            <Route path={baseUrl+'recipe/:id'} component={Recipe}/>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        baseUrl: state.recipesState.baseUrl,
    }
)

export default connect(mapStateToProps)(Root)
