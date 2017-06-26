import React from 'react'
import { Provider } from 'react-redux'
import Root from '../containers/root'
import { BrowserRouter } from 'react-router-dom'
import ReactOnRails from 'react-on-rails'

// See documentation for https://github.com/reactjs/react-redux.
// This code here binds your smart component to the redux store.
const mainNode = (_initialProps, _context) => {
    const store = ReactOnRails.getStore('recipesStore')
    console.log(store.getState().recipesState.baseUrl)
    const reactComponent = (
        <Provider store={store}>
            <BrowserRouter base={store.getState().recipesState.baseUrl }>
                <Root/>
            </BrowserRouter>
        </Provider>
    )
    return reactComponent
}

export default mainNode
