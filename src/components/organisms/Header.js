import React from 'react'

import Appbar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'


import Anchor from '../atoms/Anchor'

import style from './styles/Header.css'

const Header = () => (
  <Appbar flat={true} theme={style} className={style.headerContainer} >
    <div className={style.logoContainer}>
      <Anchor to="/">
        <img src="/public/images/logo-text.png" alt="Rumantara" />
      </Anchor>
    </div>
    <Navigation type="horizontal">
      <Anchor className={style.navAnchor} to="/host">Be a Hoster</Anchor>
      <Anchor className={style.navAnchor} to="/login">Login</Anchor>
      <Anchor className={style.navAnchor} to="/register">Sign Up</Anchor>
    </Navigation>
  </Appbar>
)

export default Header
