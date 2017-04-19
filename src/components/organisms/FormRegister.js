import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'

import { registerUser } from '../../actions/authentication'

import style from './styles/FormLogin.css'

class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'test@rumantara.com',
      password: 'secret',
      name: 'Test Register',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlesubmit = this.handleSubmit.bind(this)
  }
  handleChange(val, el) {
    this.setState({ ...this.state, [el.target.name]: val })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.registerUser(this.state.email, this.state.password, '/')
  }
  render() {
    return (
      <form className={style.formLoginContainer}>
        <Input
          type="text"
          label="Name"
          icon="person_outline"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <Input
          type="email"
          label="Email"
          icon="mail_outline"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          icon="lock_outline"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Button
          label="Register"
          type="submit"
          primary={true}
          raised={true}
          onClick={e => this.handleSubmit(e)}
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText,
})

const mapDispatchToProps = dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)
