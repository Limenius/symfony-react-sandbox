import React from 'react'
import { Provider } from 'react-redux'
import Root from '../containers/root'
import { BrowserRouter } from 'react-router-dom'
import ReactOnRails from 'react-on-rails'

// See documentation for https://github.com/reactjs/react-redux.
// This code here binds your smart component to the redux store.
const mainNode = (_initialProps, _context) => {
    const store = ReactOnRails.getStore('recipesStore')
    const reactComponent = (
        <Provider store={store}>
            <BrowserRouter basename={store.getState().recipesState.baseUrl + '/redux'}>
                <Root/>
            </BrowserRouter>
        </Provider>
    )
    return reactComponent
}

export default mainNode
