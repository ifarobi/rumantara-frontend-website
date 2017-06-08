import React, { Component } from 'react'
import Dialog from 'react-toolbox/lib/dialog'

class ConfirmDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDialogActive: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle() {
    this.setState({ isDialogActive: !this.state.isDialogActive })
  }
  render() {
    const action = [
      { label: 'Cancel', onClick: this.handleToggle },
      { label: 'Yes', onClick: this.props.onConfirm },
    ]
    const { isDialogActive } = this.state
    return (
      <Dialog
        active={isDialogActive}
        actions={action}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title={this.props.title}
      >
        {this.props.children}
      </Dialog>
    )
  }
}

export default ConfirmDialog
