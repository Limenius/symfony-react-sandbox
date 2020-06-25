Symfony React Sandbox
=====================

This sandbox provides an example of usage of [ReactBundle](https://github.com/limenius/ReactBundle) with server and client-side React rendering (universal/isomorphical) and its integration with a fitting Webpack Encore setup. It also provides an example of the usage of [LiformBundle](https://github.com/Limenius/LiformBundle) to generate a json-schema from Symfony forms and a forms and validation in React from that schema.

**Note**: If you are new to React.js, please note that this sandbox or the bundle are not by any means required to use React with Symfony. This showcases how to do some advanced features such as Server Side Rendering, a better integration with forms, injecting components directly from Twig tags, that may be difficult.

You can see this example live at http://symfony-react.limenius.com/

It is also a fully functional Symfony application that you can use as skeleton for new projects.

It has three main areas of interest:

* The server-side code under `src/` and `app/config` configuration.
* The JavaScript and CSS (SCSS) code under `assets/`.
* The Webpack Encore configuration for client and server-side rendering at `webpack.config.js` and `webpack.config.serverside.js`.

Note that you won't need to run an external node server to do server-side rendering, as we are using [PhpExecJs](https://github.com/nacmartin/phpexecjs) although ReactBundle would make it possible if we neeeded that setup.

If you are interested on this, please also check out **[React on Rails](https://github.com/shakacode/react_on_rails)** by Shakacode, as we are here basically replicating their fantastic job.


How to run it
=============

Requirements: you need a recent version of node, and Webpack installed (you can install it with `npm install -g webpack webpack-dev-server`).

    git clone https://github.com/Limenius/symfony-react-sandbox.git
    cd symfony-react-sandbox
    composer install
    npm install # or yarn install if you use yarn

Configure your database editing `.env` and setting your database name, user and password. Then, create the schema and load fixtures:

    bin/console doctrine:database:create --if-not-exists
    bin/console doctrine:schema:create
    bin/console doctrine:fixtures:load

This should populate your database with some tasty sample data.

For convenience, we have included public and private encryption keys in `config/jwt` directory. Their password is "potato". Of course, if you plan to use this in a production environment, please generate new keys with a different password :). There is a file called `.env.dist` that you can rename to `.env`, or copy the relevant parts to your `.env`:

```
JWT_PRIVATE_KEY_PATH=config/jwt/private.pem
JWT_PUBLIC_KEY_PATH=config/jwt/public.pem
JWT_PASSPHRASE=potato
```


And then, run a live server with Webpack hot-reloading of assets:

* Building the server-side react Webpack bundle.

    ./node_modules/.bin/encore dev --config webpack.config.serverside.js --watch

or simply `npm run webpack-serverside`

* And, In a different terminal/screen/tmux, the hot-reloading webpack server for the client assets:

    ./node_modules/.bin/encore dev-server

or simply `npm run webpack-dev`

(Note that you need to load the resulting build bundle in your template, as we do [here](https://github.com/Limenius/symfony-react-sandbox/blob/132d5c716b8de21e2bbbeb457ccc80ea177660ea/app/Resources/views/base.html.twig#L54))

* Also, you may want to run the Symfony server:

    bin/console server:start

After this, visit [http://127.0.0.1:8000](http://127.0.0.1:8000).

Why Webpack?
===========

Webpack is used to generate two separate JavaScript bundles (that share some code). One is meant for its inclusion as context for the server-side rendering. The second will contain your client-side frontend code. Given this, we can write Twig code to render React components like, for instance:

    {{ react_component('RecipesApp', {'props': props}) }}

And it will be rendered both client and server-side.

We have provided what we think are sensible defaults for both bundles, and also for the package.json dependencies, like Twitter Bootstrap and such. Feel free to adapt them to your needs.

Please note that if you are copying `webpack.config.js` or `webpack.config.server.js` to your project it is very likely that you will need also `.babelrc` to have Babel presets (used to transform React JSX and modern JavaScript to plain old JavaScript)

Why Server-Side rendering?
==========================

If you enable server-side rendering along with client-side rendering of components (this is the default) your React components will be rendered directly as HTML by Twig and then, when the client-side code is run, React will identify the already rendered HTML and it won't render it again until is needed. Instead, it will silently take control over it and re-render it only when it is needed.

This can be vital for some applications for SEO purposes or where a bot has to scrape the content (Facebook bot scraping `og:` tags for instance), but also is great for quick page-loads and to provide the content to users with JavaScript disabled (if there is any left, or if you have plans to build progressive web applications).

You can configure ReactBundle to have server-side, client-side or both. See the bundle documentation for more information.

How it works
============

When you render a React Component in a Twig template with `{{ react_component('RecipesApp', {'props': props}) }}` with client and server-side rendering enabled (this is the default setting), ReactBundle will render a `<div>` that will serve as container of the component.

Inside of it, the bundle will place all the HTML code that results of evaluating your component. It will do so by calling `PhpExecJs`, using your server-bundle, generated by Webpack as context, and retrieving the outcome.

When your client-side JavaScript runs, React will find this `<div>` tag and will recognize it as the result of rendering a component. It won't render it again (unless the evaluation of your client-side code differs), but it will take control of it, and, depending on the actions performed by the user, it will re-render the component dynamically.

Walkthrough
===========

We have set-up a simple application. A recipes App with master-detail views. In the actions of the controller under `src/AppBundle/Controller/RecipeController.php` you will find two types of actions.

### Actions that render Twig templates.

These actions retrieve the recipes that will be shown in the page and pass them as a JSON string to template.

In the Twig templates under `/app/Resouces/views/recipe/` you will find templates with code like tthis one:

    {{ react_component('RecipesApp', {'props': props}) }}

This Twig function, provided by [ReactBundle](https://github.com/limenius/ReactBundle), will render the React component `RecipesApp` in server and client modes.

### Actions that render JSON responses.

These actions act as an API and will be used by the client-side React code to retrieve data as needed when navigating to other pages without reloading the pages.

To simplify things we don't use FOSRestBundle here, but feel free to use it to build your API.

### Globally expose your React components

In order to make your React components accessible to ReactBundle, you need to register them. We are using for this purpose the npm package of the React On Rails, (that can be used outside the Ruby world).

Take a look at the `assets/js/recipes/startup/registration.js` file:

Server side:

    import ReactOnRails from 'react-on-rails'
    import RecipesApp from './RecipesApp'

    ReactOnRails.register({ RecipesApp })

#### JavaScript code organization for isomorphic apps

Note that in most cases you will be sharing almost all of your code between your client-side component and its server-side homologous, but while your client-code comes with no surprises, in the server side you will probably have to play a bit with `react-router` in order to let it know the location and set up the routing history. This is a common issue in isomorphic applications. You can find examples on how to do this all along the Internet, but also in the file `assets/js/recipes/RecipesApp.js`.

Note that React on Rails passes a second `context` parameter to the root container that includes the property `serverSide`:


    export default (initialProps, context) => {

        if (context.serverSide) {
            /...
        } else {
            /...
        }

Redux example
=============

There is a working example using Redux at `assets/js/recipes-redux/`, and available at the URI `/redux/`.

Note that the presentational components of both versions are shared, as they don't know about Redux.

Liform example
=============

There is also an example of working with forms using [LiformBundle](https://github.com/Limenius/LiformBundle), so Symfony forms are serialized into [json-schema](http://json-schema.org/), and then generated automatically in React, and can be validated against the generated schema. The idea is similar as what `$form->createView()` does, but for APIs.

This example can be accessed at the URI `/admin/liform/`.

Usage with JWT
=============

This sandbox uses [LexikJWTAuthenticationBundle](https://github.com/lexik/LexikJWTAuthenticationBundle) to handle authentication in the admin area.

If you don't plan to use server side rendering in private areas, using JWT is straightforward. However, as this is a sandbox, so a place to try things, we have provided an example that works also with server side rendering. This involves setting the JWT token in a cookie after the login and extracting the token and validating it in the controller that loads the admin panel.

The relevant pieces of code involved are [here](https://github.com/Limenius/symfony-react-sandbox/blob/symfony4/assets/js/liform/actions/index.js) and [here](https://github.com/Limenius/symfony-react-sandbox/blob/symfony4/src/Controller/AdminController.php).

Note that if you plan to copy and paste this sandbox and use it for something serious, you **should** regenerate the crypto keys following the documentation of LexikJWTAuthenticationBundle.

Server side rendering modes
===========================

This library supports two modes of using server-side rendering:

* Using [PhpExecJs](https://github.com/nacmartin/phpexecjs) to auto-detect a JavaScript environment (call node.js via terminal command or use V8Js PHP) and run JavaScript code through it.

* Using an external node.js server ([Example](https://github.com/Limenius/symfony-react-sandbox/blob/master/external-server.js). It will use a dummy server, that knows nothing about your logic to render React for you. Introduces more operational complexity (you have to keep the node server running, which is not a big deal anyways).

Currently, the best option is to use an external server in production, since having [V8js](https://github.com/phpv8/v8js) is rather hard to compile. However, if you can compile it or your distribution/OS has good packages, it is a very good option if you enable caching, as we will see in the next section.

### Cache

if in your config.prod.yaml or `config/packages/prod/limenius_react.yaml` you add the following configuration, and you have V8js installed, this bundle will be much faster:

    limenius_react:
        serverside_rendering:
            cache:
                enabled: true
                # name of your app, it is the key of the cache where the snapshot will be stored.
                key: "recipes_app"

After the first page render, this will store a snapshot of the JS virtual machine V8js in the cache, so in subsequent visits, your whole JavaScript app doesn't need to be processed again, just the particular component that you want to render.

With the cache enabled, if you change code of your JS app, you will need to clear the cache.

Credits
=======

This project is heavily inspired by the great [React on Rails](https://github.com/shakacode/react_on_rails#), and also makes use of its JavaScript package.
