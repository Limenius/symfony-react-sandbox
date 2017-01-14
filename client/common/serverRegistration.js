import ReactOnRails from 'react-on-rails';
import RecipesApp from '../Recipes/startup/RecipesAppServer';
import RecipesAppRedux from '../Recipes-redux/startup/RecipesAppServer';
import configureStore from '../Recipes-redux/store/recipesStore';

ReactOnRails.register({ RecipesApp });

// For the redux version
ReactOnRails.registerStore({recipesStore: configureStore})
ReactOnRails.register({ RecipesAppRedux });
