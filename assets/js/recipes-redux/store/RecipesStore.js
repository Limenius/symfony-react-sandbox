import { createStore, applyMiddleware, compose } from "redux";

// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
import thunkMiddleware from "redux-thunk";

import reducers from "../reducers";
import { initialStates } from "../reducers";

export default function configureStore(props, context) {
  // This is how we get initial props from Symfony into redux.
  const { recipes, recipe } = props;
  const { base, location } = context;
  const { recipesState } = initialStates;

  // Redux expects to initialize the store using an Object
  const initialState = {
    recipesState: { ...recipesState, recipe, recipes, baseUrl: base, location }
  };

  // use devtools if we are in a browser and the extension is enabled
  let composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  return store;
}
