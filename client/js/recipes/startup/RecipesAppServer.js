import React from 'react'
import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import { StaticRouter, Route } from 'react-router'

export default (initialProps) => {
    const context = {}
    return (
        <StaticRouter location={initialProps.location} context={context} >
            <div>
                <Route path={initialProps.baseUrl + 'recipe/:slug'} render={(props) => <Recipe {...initialProps} {...props} />}/>
                <Route path={initialProps.baseUrl} exact render={(props) => {
                    return ( <Recipes {...initialProps} {...props} />)
                }}></Route>
            </div>
        </StaticRouter>
    )
}
