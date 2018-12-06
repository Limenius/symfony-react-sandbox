import ReactOnRails from "react-on-rails";
import RecipesAppRedux from "./RecipesApp";
import configureStore from "../store/RecipesStore";

const recipesStore = configureStore;

ReactOnRails.registerStore({ recipesStore });
ReactOnRails.register({ RecipesAppRedux });
