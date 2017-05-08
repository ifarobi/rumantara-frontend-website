import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutAndRedirect } from '../../common/actions/authentication'

class Logout extends Component {
  componentWillMount() {
    this.props.logoutAndRedirect()
  }
  render() {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  logoutAndRedirect: bindActionCreators(logoutAndRedirect, dispatch),
})

export default connect(null, mapDispatchToProps)(Logout)
