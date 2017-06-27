import React from 'react'

import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import {
      BrowserRouter as Router,
      Route,
      Link
} from 'react-router-dom'

export default (initialProps, context) => {
    return (
        <Router basename={context.base}>
            <div>
                <Route path={'/recipe/:id'} render={(props) => <Recipe {...initialProps} base={context.base} {...props} />}/>
                <Route path={'/'} exact render={(props) => {
                    return ( <Recipes {...initialProps} base={context.base} {...props} />)
                }}></Route>
            </div>
        </Router>
    )
}
