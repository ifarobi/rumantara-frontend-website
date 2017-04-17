import React from 'react'

import Primary from '../components/templates/Primary'
import FormLogin from '../components/organisms/FormLogin'

import style from './styles/Login.css'

const Login = () => (
  <Primary>
    <div className={style.wrapperLogin}>
      <FormLogin />
    </div>
  </Primary>
)

export default Login
