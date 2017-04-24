import React from 'react'
import FormRegister from '../components/organisms/FormRegister'

import style from './styles/Login.css'

const Register = () => (
  <div className="pageContainer with-padding">
    <div className={style.wrapperLogin}>
      <FormRegister />
    </div>
  </div>
)

export default Register
