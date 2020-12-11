import '@reach/dialog/styles.css'
import Dialog from '@reach/dialog'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Logo } from './components/logo'

function LoginForm({ onSubmit, title }) {

    const doSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            username: event.target[0].value,
            password: event.target[1].value
        })
    }
    return (
        <form onSubmit={doSubmit}>
            <div>
                <label>Username</label>
                <input type="text" id="username" />
            </div>
            <div className="">
                <label>Password</label>
                <input type="password" id="password" autoComplete="on" />
            </div>
            <button type="submit">{title}</button>
        </form>
    )
}


function App() {
    const modals = {
        login: 'LOGIN',
        register: 'REGISTER',
        none: 'NONE'
    };

    const login = (values) => {
        console.log(values);
    }

    const signup = (values) => {
        console.log(values);
    }

    const [modalState, setModalState] = useState(modals.none);
    return (
        <div>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <div>
                <button onClick={() => setModalState(modals.login)}>Login</button>
            </div>
            <div>
                <button onClick={() => setModalState(modals.register)}>Register</button>
            </div>

            <Dialog aria-label="LoginDialog" isOpen={modalState === modals.login}>
                <button onClick={() => setModalState(modals.none)}>Close</button>
                <LoginForm title="Login" onSubmit={login} />
            </Dialog>

            <Dialog aria-label="SignupDialog" isOpen={modalState === modals.register}>
                <button onClick={() => setModalState(modals.none)}>Close</button>
                <LoginForm title="Register" onSubmit={signup} />
            </Dialog>

        </div>
    )
}
ReactDOM.render(<App />, document.getElementById("root"))