import React from 'react';
import Recipes from '../containers/Recipes';
import Recipe from '../containers/Recipe';
import { ServerRouter, Match, createServerRenderContext } from 'react-router'

export default (initialProps) => {
    const context = createServerRenderContext();
    return (
        <ServerRouter location={initialProps.location} context={context} >
            <div>
                <Match pattern={initialProps.baseUrl + 'recipe/:slug'} render={(props) => <Recipe {...initialProps} {...props} />}/>
                <Match pattern={initialProps.baseUrl} exactly render={(props) => {
                    return ( <Recipes {...initialProps} {...props} />)
                }}></Match>
            </div>
        </ServerRouter>
    );
};
