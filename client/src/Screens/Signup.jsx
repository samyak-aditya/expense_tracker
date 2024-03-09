import React from 'react'
import './Login.css'
import Button from '../Components/Button'

const Signup = () => {
    return (
        <div className='upper-container'>
            <div className='container'>
                <h1>Expense <span>Tracker</span></h1>
                <div className='login'>
                    <h2>Sign Up</h2>
                    <form>
                        <input type="text" placeholder='Name' />
                        <input type="text" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="password" placeholder='Re-enter password' />
                        <Button value={'Sign Up'} />
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup