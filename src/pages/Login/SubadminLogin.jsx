import React, { useState } from 'react'
import '../../css/Login.css'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";


import img1 from '../../assest/loading1.gif'



const SubadminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const userType='SUB-ADMIN'
  const [loading, setLoading] = useState(false);


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Fill all the fields");
      return;
    }

    setLoading(true);
    const formData = { email, password, userType };

    postApi(endPoints.loginAdmin, formData, {
      setResponse: (response) => {
        sessionStorage.setItem("token", response?.accessToken);
        navigate('/dashboard')
      },
      setLoading,
      successMsg: "Login Successfully!",
      errorMsg: "Failed to Login!",
    });
  };


  const navigate = useNavigate()


  return (
    <>
      <div className='login'>
        <div className='login1'>
          <button onClick={() => navigate('/login')}>Admin Login</button>
        </div>
        <div className='login2'>
          <div className='firstpage2'>
            <h1>Y</h1>
            <h1>T</h1>
          </div>
          <div className='login3'>
            <div className='login4'>
              <h1>Welcome to Admin panel</h1>
              <p>Login to access your account</p>
            </div>
            <form className="login-form">
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <div className='logininputseye' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye color='#313131' size={25} /> : <FaEyeSlash color='#313131' size={25} />}
                </div>
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                {/* <a href='/forgotpassword' className="forgot-password">
                  Forgot Password?
                </a> */}
              </div>
            </form>
            <div className='login6'>
              {loading ?
                <img src={img1} alt="" />
                :
                <button onClick={handleLogin}>Login</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubadminLogin