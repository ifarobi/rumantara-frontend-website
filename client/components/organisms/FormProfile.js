import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import config from 'config'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'
import cookie from 'react-cookie'

import Panel from './Panel'
import UploadBox from './UploadBox'
import { storage } from '../../../common/helpers/firebase'
import { updateUser } from '../../../common/actions/authentication'

class FormProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      password: '',
      retype: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeGender = this.handleChangeGender.bind(this)
    this.handleChangeProfile = this.handleChangeProfile.bind(this)
    this.handleChangeBirtDate = this.handleChangeBirtDate.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.commitChange = this.commitChange.bind(this)
  }
  componentWillMount() {
    const user = cookie.load('user')
    user.profile.data.birth_date = new Date(user.profile.data.birth_date)
    this.setState({ user })
  }
  commitChange() {
    const { user } = this.state
    this.props.updateUser(user)
  }
  handleSave(e) {
    e.preventDefault()
    const { user, password, retype } = this.state
    const { token } = this.props
    const {
      no_ktp,
      gender,
      birth_date,
      phone_number,
      profile_photo_url,
      ktp_photo_url,
      address,
      about_me,
    } = user.profile.data
    // axios.put(`${config.API_URL}/users/${user.id}`, {
    //   name: user.name,
    //   password: password,
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    // .then((response) => {
    //   this.commitChange()
    // })
    const date = new Date(birth_date)
    axios.put(`${config.API_URL}/user-profiles/${user.id}`, {
      no_ktp,
      gender,
      birth_date: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
      phone_number,
      profile_photo_url,
      ktp_photo_url,
      address,
      about_me,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response)
      this.commitChange()
    })
  }
  handleChangePassword(val, el) {
    this.setState({ [el.target.name]: val })
  }
  handleChange(val, el) {
    const newUser = Object.assign(this.state.user, {
      [el.target.name]: val,
    })
    this.setState({ user: newUser })
  }
  handleChangeProfile(val, el) {
    const newProfile = Object.assign(this.state.user.profile.data, {
      [el.target.name]: val,
    })
    const newUser = Object.assign(this.state.user, {
      profile: { data: newProfile },
    })
    console.log(newUser)
    this.setState({ user: newUser })
  }
  handleChangeGender(val) {
    const newProfile = Object.assign(this.state.user.profile.data, {
      gender: val,
    })
    const newUser = Object.assign(this.state.user, {
      profile: { data: newProfile },
    })
    this.setState({ user: newUser })
  }
  handleChangeGender(val) {
    const newProfile = Object.assign(this.state.user.profile.data, {
      gender: val,
    })
    const newUser = Object.assign(this.state.user, {
      profile: { data: newProfile },
    })
    this.setState({ user: newUser })
  }
  handleChangeBirtDate(val) {
    const newProfile = Object.assign(this.state.user.profile.data, {
      birth_date: val,
    })
    const newUser = Object.assign(this.state.user, {
      profile: { data: newProfile },
    })
    this.setState({ user: newUser })
  }
  handleUpload(file, name) {
    console.log(file)
    const storageRef = storage.ref()
    const meta = {
      contentType: 'image/jpeg',
    }
    const newImage = storageRef.child(`images/${file.name}`)
    newImage.put(file, meta).then((snap) => {
      console.log("uploaded")
      console.log(snap.downloadURL)
      this.handleChangeProfile(snap.downloadURL, {
        target: {
          name,
        },
      })
    })
  }
  render() {
    const {
      name,
      id,
    } = this.state.user
    const {
      no_ktp,
      gender,
      birth_date,
      phone_number,
      address,
      about_me,
      profile_photo_url,
      ktp_photo_url,
      status,
    } = this.state.user.profile.data
    return (
      <section>
        <Panel title="Basic Info">
          <form method="post">
            <Input
              label="Name"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <Input
              type="password"
              name="retype"
              label="Retype Password"
              value={this.state.retype}
              onChange={this.handleChangePassword}
            />
          </form>
        </Panel>
        <Panel title="User Info">
          <form method="post">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <UploadBox
                  title="Profile Photo"
                  name="profile_photo_url"
                  center={true}
                  width="150px"
                  height="150px"
                  onUpload={(file) => {
                    this.handleUpload(file[0], 'profile_photo_url')
                  }}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <UploadBox
                  title="ID Card Photo"
                  name="ktp_photo_url"
                  center={true}
                  onUpload={(file) => {
                    this.handleUpload(file, 'ktp_photo_url')
                  }}
                  width="150px"
                  height="150px"
                />
              </div>
            </div>
            <Input
              type="text"
              name="no_ktp"
              label="ID Number"
              value={no_ktp}
              onChange={this.handleChangeProfile}
            />
            <Dropdown
              label="Gender"
              onChange={this.handleChangeGender}
              value={gender}
              source={[{
                value: 'Pria',
                label: 'Pria',
              }, {
                value: 'Wanita',
                label: 'Wanita',
              }]}
            />
            <DatePicker
              label="Birth Date"
              autoOk={true}
              name="birth_date"
              value={birth_date}
              onChange={this.handleChangeBirtDate}
              sundayFirstDayOfWeek={true}
            />
            <Input
              type="text"
              name="phone_number"
              label="Phone"
              value={phone_number}
              onChange={this.handleChangeProfile}
            />
            <Input
              type="text"
              name="address"
              multiline={true}
              label="Address"
              rows={2}
              value={address}
              onChange={this.handleChangeProfile}
            />
            <Input
              type="text"
              name="about_me"
              rows={4}
              multiline={true}
              label="About Me"
              value={about_me}
              onChange={this.handleChangeProfile}
            />
            <Button
              className={classnames('no-box-shadow', 'no-radius')}
              primary={true}
              raised={true}
              onClick={this.handleSave}
              label="Save"
              icon="save"
              type="submit"
            />
          </form>
        </Panel>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token.accessToken,
})

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormProfile)
