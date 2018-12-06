import React from "react";
import ReactOnRails from "react-on-rails";
import { Provider } from "react-redux";
import App from "../components/App";

const mainNode = () => {
  const store = ReactOnRails.getStore("recipesAdminStore");

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default mainNode;
