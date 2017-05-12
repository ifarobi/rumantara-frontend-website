import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'
import cookie from 'react-cookie'

import Panel from '../../components/organisms/Panel'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeGender = this.handleChangeGender.bind(this)
    this.handleChangeProfile = this.handleChangeProfile.bind(this)
    this.handleChangeBirtDate = this.handleChangeBirtDate.bind(this)
  }
  componentWillMount() {
    const user = cookie.load('user')
    this.setState({ user })
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
      <section className="pageContainer">
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
              value=""
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="retype"
              label="Retype Password"
              value=""
              onChange={this.handleChange}
            />
          </form>
        </Panel>
        <Panel title="User Info">
          <form method="post">
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
                value: 'Perempuan',
                label: 'Perempuan',
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
          </form>
        </Panel>
      </section>
    )
  }
}

export default Profile
