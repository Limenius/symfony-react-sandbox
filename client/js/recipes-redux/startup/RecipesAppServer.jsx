import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/recipesStore';
import Recipes from '../containers/recipes';
import configureRoutes from '../routes';
import { ServerRouter, createServerRenderContext } from 'react-router'
import ReactOnRails from 'react-on-rails';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
var mainNode = (props) => {
    const store = ReactOnRails.getStore('recipesStore');

    var routes = configureRoutes(store);
    const { location, baseUrl } = store.getState().recipes;

    const context = createServerRenderContext();

    const reactComponent = (
        <Provider store={store}>
            <ServerRouter location={location} context={context}>
                {configureRoutes(store)}
            </ServerRouter>
        </Provider>
    );
    return reactComponent;
};

export default mainNode;
