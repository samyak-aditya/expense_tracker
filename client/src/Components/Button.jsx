import React from 'react'
import '../App.css'

const Button = ({ value }) => {
    return (
        <div className='btn-component'>
            <button>{value}</button>
        </div>
    )
}

export default Button