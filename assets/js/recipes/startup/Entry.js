import React from "react";
import { renderToString } from "react-dom/server";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import App from "./RecipesApp";

export default (initialProps, context) => {
  // We render a different router depending on whether we are rendering server side
  // or client side.
  // Also, for Server side rendering we return an object with:
  // componentHtml (the component)
  // title (the title)
  // other data you may need to render the page
  if (context.serverSide) {
    const renderedHtml = {
      componentHtml: renderToString(
        <StaticRouter
          basename={context.base}
          location={context.location}
          context={{}}
        >
          <App initialProps={initialProps} appContext={context} />
        </StaticRouter>
      ),
      title: Helmet.renderStatic().title.toString()
    };
    return { renderedHtml };
  } else {
    return (
      <BrowserRouter basename={context.base}>
        <App initialProps={initialProps} appContext={context} />
      </BrowserRouter>
    );
  }
};
