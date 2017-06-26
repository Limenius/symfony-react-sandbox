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
        <Router base={context.base}>
            <div>
                <Route path={context.base + '/recipe/:id'} render={(props) => <Recipe {...initialProps.props} base={context.base} {...props} />}/>
                <Route path={context.base} exact render={(props) => {
                    return ( <Recipes {...initialProps.props} base={context.base} {...props} />)
                }}></Route>
            </div>
        </Router>
    )
}
