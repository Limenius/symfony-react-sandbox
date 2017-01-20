import React from 'react'

import Recipes from '../containers/Recipes'
import Recipe from '../containers/Recipe'
import { BrowserRouter, Match } from 'react-router'

export default (initialProps) => {
    return (
        <BrowserRouter>
            <div>
                <Match pattern={initialProps.baseUrl + 'recipe/:slug'} render={(props) => <Recipe {...initialProps} {...props} />}/>
                <Match pattern={initialProps.baseUrl} exactly render={(props) => {
                    return ( <Recipes {...initialProps} {...props} />)
                }}></Match>
            </div>
        </BrowserRouter>
    )
}
