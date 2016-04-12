require('../../sass/layout.scss');

import ReactDOM from 'react-dom';
import React from 'react';

import Recipes from '../containers/Recipes';
import Recipe from '../containers/Recipe';
import { Router, Route } from 'react-router'
import { createHistory, useBasename } from 'history';


var history = createHistory();

const routes = (
    <div>
        // set a base url to '/' or maybe '/app_dev.php'
        <Route path={window.baseUrl} component={Recipes}></Route>
        <Route path={window.baseUrl+'recipe/:slug'} component={Recipe}/>
    </div>
);


export default (props) => {
    var rprops = {};
    rprops.params = props;
    var createElement = function(Component, compProps) {
        for (var prop in props) { compProps.params[prop] = props[prop]; }
        return <Component {...compProps} />
    };
    return (
        <Router createElement={createElement} history={history} children={routes} {...props}/>
    );
};
