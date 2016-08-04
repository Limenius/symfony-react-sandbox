import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/recipesStore';
import Recipes from '../containers/recipes';
import configureRoutes from '../routes';
import { match, RouterContext } from 'react-router'
import ReactOnRails from 'react-on-rails';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
var mainNode = (props) => {
    const store = ReactOnRails.getStore('recipesStore');

    var routes = configureRoutes(store);
    const { location, baseUrl } = store.getState().recipes;

    let error;
    let redirectLocation;
    let routeProps;

    // See https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
    match({ routes, location: location }, (_error, _redirectLocation, _routeProps) => {
        error = _error;
        redirectLocation = _redirectLocation;
        routeProps = _routeProps;
    });
    if (error || redirectLocation) {
        return { error, redirectLocation };
    }

    const reactComponent = (
        <Provider store={store}>
            <RouterContext {...routeProps}/>
        </Provider>
    );
    return reactComponent;
};

export default mainNode;
