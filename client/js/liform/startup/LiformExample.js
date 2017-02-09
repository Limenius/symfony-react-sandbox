import React from 'react'

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field } from 'redux-form'
import { Provider } from 'react-redux'
import Liform, { DefaultTheme } from 'liform-react'
import Dropzone from 'react-dropzone'


const submit = (values, _dispatch) =>
{
    return new Promise((resolve, reject) => {
        fetch('/liform/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( values )
        }).then(function (response) {
            if (response.status == 400) {
                reject({ name: 'wrong values' })
            }
            resolve()
        })
    })
}

const mainNode = (props) => {
    const reducers = {
        form: formReducer
    }
    const reducer = combineReducers(reducers)

    let store
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ) {
        store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__())
    } else {
        store = createStore(reducer)
    }

    const reactComponent = (
        <Provider store={store}>
            <Liform schema={props.schema} onSubmit={submit} initialValues={props.initialValues}/>
        </Provider>
    )
    return reactComponent
}

export default mainNode
