import React, { useState } from 'react'
import '../../css/Login.css'
import { useNavigate } from 'react-router-dom';


const Verifycode = () => {

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
                            <h1>Verify code</h1>
                            <p>An authentication code has been sent to your Email ID.</p>
                        </div>
                        <form className="login-form">
                            <div className="input-container">
                                <input type="email" id="email" required />
                                <label htmlFor="email">Enter code</label>
                            </div>
                            <div className='login8'>
                                <p>Didn’t receive a code? <span>Resend</span></p>
                            </div>
                        </form>
                        <div className='login6'>
                            <button onClick={()=>navigate('/setpassword')}>Submit</button>
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

export default Verifycode