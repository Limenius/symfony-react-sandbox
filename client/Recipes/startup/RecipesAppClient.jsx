import ReactDOM from 'react-dom';
import React from 'react';

import Recipes from '../containers/Recipes';
import Recipe from '../containers/Recipe';
import { Router } from 'react-router'
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
    basename: window.BaseUrl + ''
})

const routes = [
    { path: '/', component: Recipes },
    { path: 'recipe/:slug', component: Recipe }
];


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
