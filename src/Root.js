import React, { Component } from 'react'

// migrate to grommet
import App from 'grommet/components/App'
import Responsive from 'grommet/utils/Responsive'

class Root extends Component {
  constructor() {
    super()
    this.onResponsive = this.onResponsive.bind(this)
    this.state = {}
  }
  componentDidMount() {
    this.responsive = Responsive.start(this.onResponsive)
  }

  onResponsive(small) {
    this.setState({ small })
  }

  componentWillUnmout() {
    this.responsive.stop()
  }

  render() {
    return (
      <App className="rumantara-app" centered={false}>
        { this.props.children }
      </App>
    )
  }
}

export default Root
