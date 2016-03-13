import { IndexRoute, Route } from 'react-router';
import React from 'react';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipe';

export default (
   <div>
   <Route path={window.baseUrl} component={Recipes}></Route>
   <Route path={window.baseUrl+"recipe/:slug"} component={Recipe}/>
   </div>
);
