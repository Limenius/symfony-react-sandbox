import { IndexRoute, Route } from 'react-router';
import React from 'react';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipe';

export default function configureRoutes(store) {
    const baseUrl = store.getState().recipes.baseUrl + 'redux/';
    return (
    <div>
    <Route path={baseUrl} component={Recipes}></Route>
    <Route path={baseUrl+"recipe/:slug"} component={Recipe}/>
    </div>);
};
