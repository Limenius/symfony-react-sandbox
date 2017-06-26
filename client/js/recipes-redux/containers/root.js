import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import Recipes from '../containers/recipes'
import Recipe from '../containers/recipe'

const NoMatch = (props) => {
    console.log(props)
    return (<h1>Mal</h1>)
}

const Root = (props) => {
    console.log(props)
    const baseUrl = props.baseUrl
    console.log(baseUrl + '/redux/')
    return (
        <div>
            <Route path="/redux/" exact component={Recipes}/>
            <Route path="/recipe/:id" component={Recipe}/>
            <Route component={NoMatch}/>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        baseUrl: state.recipesState.baseUrl,
    }
)

export default connect(mapStateToProps)(Root)
