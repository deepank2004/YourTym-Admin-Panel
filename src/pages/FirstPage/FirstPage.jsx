import React from 'react'
import { useNavigate } from 'react-router-dom'

const FirstPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='firstpage'>
        <div className='firstpage1'>
          <div className='firstpage2'>
            <h1>Y</h1>
            <h1>T</h1>
          </div>
          <div className='firstpage3'>
            <button onClick={()=>navigate('/login')}>Login</button>
            <button onClick={()=>navigate('/sub-admin-login')}>Sub Admin Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FirstPage