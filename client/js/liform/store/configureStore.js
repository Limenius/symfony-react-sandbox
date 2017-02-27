import { createStore } from 'redux'

import reducers from '../reducers'
import { initialStates } from '../reducers'


export default function configureStore(props) {

    // This is how we get initial props from Symfony into redux.
    const { recipes } = props
    const { recipesState } = initialStates


    // Redux expects to initialize the store using an Object
    const initialState = {
        recipesState: { ...recipesState, recipes },
    }

    // use devtools if we are in a browser and the extension is enabled
    let enhancer = typeof(window) !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  : null

    const store = createStore(
        reducers,
        initialState,
        enhancer
    )
    return store
}
