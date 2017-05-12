import React, { Component } from 'react'
import { connect } from 'react-redux'

import Appbar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'


import Anchor from '../atoms/Anchor'

import style from './styles/Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.renderNav = this.renderNav.bind(this)
  }
  renderNav() {
    if (this.props.isAuthenticated) {
      return (
        <Navigation type="horizontal">
          <Anchor className={style.navAnchor} to="/host">Host</Anchor>
          <Anchor className={style.navAnchor} to="/dashboard/profile">
            {this.props.user.name}
          </Anchor>
          <Anchor className={style.navAnchor} to="/logout">Logout</Anchor>
        </Navigation>
      )
    }
    return (
      <Navigation type="horizontal">
        <Anchor className={style.navAnchor} to="/host">Be a Hoster</Anchor>
        <Anchor className={style.navAnchor} to="/login">Login</Anchor>
        <Anchor className={style.navAnchor} to="/register">Sign Up</Anchor>
      </Navigation>
    )
  }
  render() {
    return (
      <Appbar flat={true} theme={style} className={style.headerContainer} >
        <div className={style.logoContainer}>
          <Anchor to="/">
            <img src="/public/images/logo-text.png" alt="Rumantara" />
          </Anchor>
        </div>
        {this.renderNav()}
      </Appbar>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(Header)
