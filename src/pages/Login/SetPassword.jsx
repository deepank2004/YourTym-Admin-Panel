import React, { useState } from 'react'
import '../../css/Login.css'
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const SetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                            <h1>Set a Password</h1>
                            <p>Your previous password has been reset. Please set a <br />new password for your account.</p>
                        </div>
                        <form className="login-form">
                            <div className="input-container">
                                <input type="email" id="email" required />
                                <label htmlFor="email">Create  New Password</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    required
                                />
                                <label htmlFor="password">Re-enter New Password</label>
                                <div className='logininputseye' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye color='#313131' size={25} /> : <FaEyeSlash color='#313131' size={25} />}
                                </div>
                            </div>
                        </form>
                        <div className='login6'>
                            <button onClick={()=>navigate('/login')}>Submit</button>
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

export default SetPassword