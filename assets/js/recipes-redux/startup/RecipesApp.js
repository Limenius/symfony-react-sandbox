import React from "react";
import { Provider } from "react-redux";
import Root from "../containers/root";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import ReactOnRails from "react-on-rails";

// See documentation for https://github.com/reactjs/react-redux.
// This code here binds your smart component to the redux store.
const mainNode = (_initialProps, context) => {
  const store = ReactOnRails.getStore("recipesStore");
  const { location, base, serverSide } = context;

  // We render a different router depending on whether we are rendering server side
  // or client side.
  let Router;
  if (serverSide) {
    Router = props => (
      <StaticRouter basename={base + "/redux"} location={location} context={{}}>
        {props.children}
      </StaticRouter>
    );
  } else {
    Router = props => (
      <BrowserRouter basename={base + "/redux"}>{props.children}</BrowserRouter>
    );
  }

  const reactComponent = (
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  );
  return reactComponent;
};

export default mainNode;
