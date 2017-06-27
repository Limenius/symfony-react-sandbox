import React from 'react'
import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import { StaticRouter, Route } from 'react-router'

export default (initialProps, context) => {
    return (
        <StaticRouter basename={context.base} location={context.location} context={{}} >
            <div>
                <Route path={'/recipe/:id'} render={(props) => <Recipe {...initialProps} base={context.base} {...props} />}/>
                <Route path={'/'} exact render={(props) => {
                    return ( <Recipes {...initialProps} base={context.base} {...props} />)
                }}></Route>
            </div>
        </StaticRouter>
    )
}
