import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import _ from 'lodash';

// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this
// once your app has asynchronous actions.
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import { initialStates } from '../reducers';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});

export default function configureStore(props, browserHistory) {

    // This is how we get initial props from Symfony into redux.
    const { recipes, recipe, baseUrl, location } = props;
    const { recipesState } = initialStates;

    // Redux expects to initialize the store using an Object
    const initialState = {
        recipesState: _.extend(recipesState, {
            recipe: recipe,
            recipes: recipes,
            baseUrl: baseUrl,
            location: location,
        }),
    };

    const reduxRouterMiddleWare = routerMiddleware(browserHistory)
    const store = createStore(
        reducers,
        applyMiddleware(reduxRouterMiddleWare, thunkMiddleware, loggerMiddleware),
        //typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    );
    return store;
}
