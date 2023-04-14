import React, {useState, useEffect} from 'react'
import './Form.css'
import validation from '../validation/validation.js'

export default function Form({login}) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })

    const handleOnChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }
  return (
    <div className='Form-Div-Rectangle'>
        <div className='Form-Div-Square'>
            <form className='Form-Form' onSubmit={handleSubmit}>
                <label className='Form-Label' htmlFor="email">Email</label>
                <input name='email' className={errors.email && userData.email ? 'Form-Input-Error' : 'Form-Input'} autoComplete='off' type="email" onChange={handleOnChange} value={userData.email}/>
                <label className='Form-Label' htmlFor="password">Password</label>
                <input name='password' className={errors.password && userData.password ? 'Form-Input-Error' : 'Form-Input'} autoComplete='off'  type="password" onChange={handleOnChange} value={userData.password}/>
                <button className={errors.email || errors.password || userData.email.length === 0 || userData.password.length === 0 ? 'Form-Submit-Disabled' : 'Form-Submit-Enabled'} type='submit' disabled={errors.email || errors.password || userData.email.length === 0 || userData.password.length === 0}><img src={require('../Images/LogInImg.png')}/></button>
            </form>
        </div>
    </div>
    
  )
}
