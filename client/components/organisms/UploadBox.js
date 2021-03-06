import React, { Component } from 'react'

import Button from 'react-toolbox/lib/button'

import style from './styles/UploadBox.css'

class UploadBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: true,
      imageSource: null,
      file: null,
    }
    this.fileInput = null
    this.handleBoxClick = this.handleBoxClick.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({ imageSource: this.props.value })
    }
  }
  handleChangeFile() {
    this.setState({
      buttonDisabled: false,
      file: this.fileInput.files,
    })
    if (this.fileInput.files.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ imageSource: e.target.result })
      }
      reader.readAsDataURL(this.fileInput.files[0])
      if (this.props.callbackChangePict) {
        this.props.callbackChangePict(this.fileInput.files)
      }
    }
  }
  handleBoxClick() {
    this.fileInput.click()
  }
  render() {
    const {
      width,
      height,
      center,
      name,
      multiple,
      hint,
      title,
      buttonLabel,
      onUpload,
    } = this.props
    let componentStyle = {
      width,
      height,
    }
    if (center) {
      componentStyle = Object.assign(componentStyle, {
        margin: 'auto',
      })
    }
    const { buttonDisabled, imageSource, file } = this.state
    const labelBtn = (typeof buttonLabel !== 'undefined') ? buttonLabel : 'Upload'
    return (
      <div className={style.uploadBoxContainer}>
        <span className={style.title}>{title}</span>
        <div style={componentStyle} className={style.uploadBox} onClick={this.handleBoxClick}>
          <img alt="upload" style={{ display: (imageSource !== null ? 'block' : 'none') }} src={imageSource} className={style.image} />
          <span style={{ display: (imageSource !== null ? 'none' : 'block'), lineHeight: width }} className={style.hintText}>
            {typeof hint !== 'undefined' ? hint : 'Choose file'}
          </span>
        </div>
        <Button
          className={style.uploadButton}
          label={labelBtn}
          icon="file_upload"
          primary={true}
          disabled={buttonDisabled}
          onClick={() => { onUpload(file) }}
          raised={true}
        />
        <input
          className={style.uploadBoxInput}
          type="file"
          name={name}
          multiple={multiple}
          onChange={this.handleChangeFile}
          ref={(c) => { this.fileInput = c }}
        />
      </div>
    )
  }
}

export default UploadBox
