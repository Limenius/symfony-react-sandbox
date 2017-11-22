import React from 'react'
import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import {
      BrowserRouter,
      StaticRouter,
      Route
} from 'react-router-dom'

export default (initialProps, context) => {
    let Router

    // We render a different router depending on whether we are rendering server side
    // or client side.
    if (context.serverSide) {
        Router = (props) => (
            <StaticRouter basename={context.base} location={context.location} context={{}} >
                {props.children}
            </StaticRouter>
        )
    } else {
        Router = (props) => (
            <BrowserRouter basename={context.base}>
                {props.children}
            </BrowserRouter>
        )
    }
    return (
        <Router>
            <div>
                <Route path={'/recipe/:id'} render={(props) => <Recipe {...initialProps} base={context.base} {...props} />}/>
                <Route path={'/'} exact render={(props) => {
                    return ( <Recipes {...initialProps} base={context.base} {...props} />)
                }}></Route>
            </div>
        </Router>
    )
}
