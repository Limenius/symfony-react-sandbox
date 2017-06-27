import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import AdminForm from './AdminForm'

const App = ({authToken}) => {
    if (!authToken) {
        return <Login/>
    } else {
        return <AdminForm/>
    }
}

export default connect((state) => (
    {
        authToken: state.recipesState.authToken,
    }
))(App)
