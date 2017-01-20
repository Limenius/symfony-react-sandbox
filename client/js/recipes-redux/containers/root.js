import { Match } from 'react-router'
import { connect } from 'react-redux'
import React from 'react'
import Recipes from '../containers/recipes'
import Recipe from '../containers/recipe'

const Root = (props) => {
    const baseUrl = props.baseUrl + 'redux/'
    return (
        <div>
            <Match pattern={baseUrl} exactly component={Recipes}/>
            <Match pattern={baseUrl+'recipe/:slug'} component={Recipe}/>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        baseUrl: state.recipesState.baseUrl,
    }
)

export default connect(mapStateToProps)(Root)
