import React, { useState } from 'react'
import '../../css/Login.css'

import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {

    const navigate = useNavigate()


    return (
        <>
            <div className='login'>
                <div className='login2'>
                    <div className='firstpage2'>
                        <h1>Y</h1>
                        <h1>T</h1>
                    </div>
                    <div className='login3'>
                        <div className='login4'>
                            <h1>Forgot your password?</h1>
                            <p>Don’t worry, happens to all of us. Enter your email below<br /> to recover your password</p>
                        </div>
                        <form className="login-form">
                            <div className="input-container">
                                <input type="email" id="email" required />
                                <label htmlFor="email">Email</label>
                            </div>
                        </form>
                        <div className='login6'>
                            <button onClick={()=>navigate('/verifycode')}>Submit</button>
                        </div>
                        <div className='login7'>
                            <p>Remember your password? <span onClick={()=>navigate('/login')}>Login</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword