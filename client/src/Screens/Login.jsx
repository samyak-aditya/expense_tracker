import React from 'react'
import '../Screens/Login.css'
import Button from '../Components/Button'


const Login = () => {
    return (
        <div className='upper-container'>
            <div className='container'>
                <h1>Expense <span>Tracker</span></h1>
                <div className='login'>
                    <h2>Login</h2>
                    <form>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <Button value={'Login'} />
                    </form>
                    <h4>Don't have an account ?</h4>
                </div>

            </div>

        </div>
    )
}

export default Login