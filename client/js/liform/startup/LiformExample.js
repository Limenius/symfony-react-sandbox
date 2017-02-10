import React from 'react'

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, SubmissionError } from 'redux-form'
import { Provider } from 'react-redux'
//import Liform, { processSubmitErrors } from 'liform-react'
import Liform from 'liform-react'

const processSubmitErrors = response => {
    let errors = {}
    if (response.hasOwnProperty('errors')) {
        for (let field in response.errors.children) {
            let value = response.errors.children[field]
            if (value.hasOwnProperty('errors'))  {
                errors[field] = value.errors[0]
            }
        }
        throw new SubmissionError(errors)

    }
    return {}
}

const submit = (values) =>
{
    return fetch('/liform/tasks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( values )
    }).then( (response) => {
        return response.json()
    }).then( (json) => {
        processSubmitErrors(json)
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
