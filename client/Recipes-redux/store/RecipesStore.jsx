import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
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
    const { recipesState } = initialStates;

    // Redux expects to initialize the store using an Object, not an Immutable.Map
    const initialState = {
      recipesStore: recipesState
    };
    const reduxRouterMiddleWare = routerMiddleware(browserHistory)
    const store = createStore(
        reducers,
        applyMiddleware(reduxRouterMiddleWare, thunkMiddleware, loggerMiddleware)
        );
    return store;
}
