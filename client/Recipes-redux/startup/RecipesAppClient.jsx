require("../../sass/layout.scss");
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/recipesStore';
import Recipes from '../containers/recipes';
import routes from '../routes';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// TODO
import ReactDOM from 'react-dom';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
var mainNode = (props) => {
    console.log(browserHistory);
  const store = configureStore(props, browserHistory);
  console.log(store);
  const reactComponent = (
    <Provider store={store}>
      <Router history={browserHistory}>
      {routes}
      </Router>
    </Provider>
  );
  return reactComponent;
};

// TODO:


const target = document.getElementById('react-container');


ReactDOM.render(mainNode({}), target);

export default mainNode;
