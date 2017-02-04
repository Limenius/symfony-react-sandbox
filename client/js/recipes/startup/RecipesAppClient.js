import React from 'react'

import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import {
      BrowserRouter as Router,
      Route,
      Link
} from 'react-router-dom'

export default (initialProps) => {
    return (
        <Router>
            <div>
                <Route path={initialProps.baseUrl + 'recipe/:slug'} render={(props) => <Recipe {...initialProps} {...props} />}/>
                <Route path={initialProps.baseUrl} exact render={(props) => {
                    return ( <Recipes {...initialProps} {...props} />)
                }}></Route>
            </div>
        </Router>
    )
}
