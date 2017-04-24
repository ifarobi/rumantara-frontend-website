import React from 'react'

import FormLogin from '../components/organisms/FormLogin'

import style from './styles/Login.css'

const Login = () => (
  <div className="pageContainer with-padding">
    <div className={style.wrapperLogin}>
      <FormLogin />
    </div>
  </div>
)

export default Login
