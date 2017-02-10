import { createStore } from 'redux'

import reducers from '../reducers'
import { initialStates } from '../reducers'


export default function configureStore(props) {

    // This is how we get initial props from Symfony into redux.
    const { tasks } = props
    const { tasksState } = initialStates


    // Redux expects to initialize the store using an Object
    const initialState = {
        tasksState: { ...tasksState, tasks },
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
