import React from 'react';
import Recipes from '../containers/Recipes';
import Recipe from '../containers/Recipe';
import { Router, match, RouterContext } from 'react-router'


export default (props) => {
    let error;
    let redirectLocation;
    let routeProps;

    const routes = [
        { path: props.baseUrl, component: Recipes },
        { path: props.baseUrl + 'recipe/:slug', component: Recipe }
        ];

    // See https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
    match({ routes, location: props.location }, (_error, _redirectLocation, _routeProps) => {
        error = _error;
        redirectLocation = _redirectLocation;
        routeProps = _routeProps;
    });

    // Skip server rendering any HTML. Note, client rendering
    // will handle the redirect. What's key is that we don't try to render.
    // Critical to return the Object properties to match this { error, redirectLocation }
    if (error || redirectLocation) {
        return { error, redirectLocation };
    }

    // Important that you don't do this if you are redirecting or have an error.
    routeProps.params = props;
    return (<RouterContext {...routeProps} />);
};
