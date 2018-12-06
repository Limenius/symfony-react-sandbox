import ReactOnRails from "react-on-rails";
import Admin from "./Admin";
import configureStore from "../store/configureStore";

const recipesStore = configureStore;

ReactOnRails.register({ Admin });
ReactOnRails.registerStore({ recipesAdminStore: recipesStore });
