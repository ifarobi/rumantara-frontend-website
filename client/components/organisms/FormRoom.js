import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import Checkbox from 'react-toolbox/lib/checkbox'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'
import Button from 'react-toolbox/lib/button'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import { v4 } from 'uuid'

import { connect } from 'react-redux'

import config from 'config'
import Panel from '../organisms/Panel'
import style from './styles/Room.css'
import UploadBox from '../organisms/UploadBox'
import Map from '../atoms/Map'
import { storage } from '../../../common/helpers/firebase'

class FormRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Kamar Baru',
      address: '',
      lat: '',
      lng: '',
      base_price: 120000,
      capacity: 12,
      description: 'adsfasdf asdf asdf asdfasdfasdf asdfasdf',
      min_stay: 2,
      max_stay: 12,
      city: '',
      status_id: 5,
      pictures: [],
      isPictureUploaded: false,
      marker: null,
      amenitiesList: [],
      amenities: [],
      isProgress: false,
    }
    this.address = null
    this.marker = null
    this.id = null
    this.files = null
    this.postedAmenities = 0
    this.isRoomPicturePosted = false
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.renderLocationComponent = this.renderLocationComponent.bind(this)
    this.renderAmenities = this.renderAmenities.bind(this)
    this.handleChangeAmenities = this.handleChangeAmenities.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitPictures = this.handleSubmitPictures.bind(this)
    this.handleSubmitAmenities = this.handleSubmitAmenities.bind(this)
    this.checkIsDone = this.checkIsDone.bind(this)
  }
  componentWillMount() {
    axios.get(`${config.API_URL}/amenities`)
         .then((response) => {
           const am = response.data.map(d => ({ id: d.id, name: d.name, isChecked: false }))
           this.setState({
             amenitiesList: response.data,
             amenities: am,
           })
         })
         .catch((error) => {
           console.log(error)
         })

    if (this.props.params.id) {
      axios.get(`${config.API_URL}/rooms/${this.props.params.id}`)
           .then((response) => {
             const data = response.data
             const amState = this.state.amenities
             const amStateNew = amState.map((d) => {
               const id = data.room_amenities.find(am => (am.amenity_id === d.id))
               if (typeof id !== 'undefined') {
                 return {
                   id: d.id,
                   name: d.name,
                   isChecked: true,
                 }
               }
               return d
             })
             this.setState({
               name: data.name,
               address: data.name,
               lat: data.lat,
               lng: data.lng,
               status_id: data.status_id,
               base_price: data.base_price,
               capacity: data.capacity,
               description: data.description,
               min_stay: data.min_stay,
               max_stay: data.max_stay,
               amenities: amStateNew,
             })
           })
    }
  }
  handleChange(val, el) {
    this.setState({ [el.target.name]: val })
  }
  handleChangeAmenities(val, el) {
    const { amenities } = this.state
    const am = amenities.map((a) => {
      if (a.id === parseInt(el.target.value, 10)) {
        a.isChecked = !a.isChecked
      }
      return a
    })
    this.setState({ amenities: am })
  }
  handleUpload(cb) {
    const files = this.files
    const storageRef = storage.ref()
    const { pictures } = this.state
    const meta = {
      contentType: 'image/jpeg',
    }
    const now = new Date()
    const newImage = storageRef.child(`images/rooms/${now.getTime()}.jpg`)
    newImage.put(files[0], meta).then((snap) => {
      console.log('uploaded')
      console.log(snap.downloadURL)
      const pict = pictures.slice(0)
      pict.push(snap.downloadURL)
      this.setState({ pictures: pict, isPictureUploaded: true })
      if (cb) cb()
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { token, userId } = this.props
    const {
      name,
      address,
      lat,
      lng,
      base_price,
      capacity,
      description,
      min_stay,
      max_stay,
      city,
      pictures,
      status_id,
      amenities,
    } = this.state
    if(this.props.params.id) {
      axios.put(`${config.API_URL}/rooms/${this.props.params.id}`, {
        name,
        address,
        lat,
        lng,
        base_price,
        status_id,
        capacity,
        description,
        min_stay,
        max_stay,
        city,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
      })
    } else {
      axios.post(`${config.API_URL}/rooms`, {
        name,
        address,
        lat,
        lng,
        base_price,
        status_id,
        capacity,
        description,
        min_stay,
        max_stay,
        city,
        user_id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        this.id = response.data.room_id
        this.handleSubmitPictures()
        this.handleSubmitAmenities()
      })
    }
  }
  handleSubmitPictures() {
    const { isPictureUploaded, pictures } = this.state
    const { token } = this.props
    if (!isPictureUploaded) {
      this.handleUpload(this.handleSubmitPictures)
    } else {
      const pic = pictures.join(',')
      axios.post(`${config.API_URL}/room-pictures`, {
        room_id: this.id,
        url: pic,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log(response)
        this.isRoomPicturePosted = true
        this.checkIsDone()
      })
    }
  }
  handleSubmitAmenities() {
    const { amenities } = this.state
    const { token } = this.props
    this.setState({ isProgress: true })
    const postedAm = amenities.reduce((result, obj) => {
      if (obj.isChecked) {
        result.push({
          room_id: this.id,
          amenity_id: obj.id,
          values: 1,
          description: obj.name,
        })
      }
      return result
    }, [])
    postedAm.forEach((d) => {
      axios.post(`${config.API_URL}/room-amenities`, d, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        this.postedAmenities += 1
        this.checkIsDone()
      })
    })
  }
  checkIsDone() {
    const { amenities } = this.state
    const lengthAm = amenities.filter(d => (d.isChecked)).length
    const isAmPosted = (this.postedAmenities >= lengthAm)
    if (isAmPosted && this.isRoomPicturePosted) {
      this.props.redirect(`/room/${this.id}`)
    }
  }
  renderLocationComponent() {
    const { google, loaded } = this.props
    if (loaded) {
      const { address, lat, lng, city } = this.state
      if (this.address !== null) {
        const autocomplete = new google.maps.places.Autocomplete(
          this.address.refs.wrappedInstance.inputNode,
          { types: ['geocode'] }
        )
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          this.setState({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
          })
        })
      }
      return (
        <div>
          <div className="formGroup row">
            <div className="col-sm-3">
              <label htmlFor="city">City</label>
            </div>
            <div className="col-sm-9">
              <Input
                theme={style}
                type="text"
                name="city"
                id="address"
                value={city}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="formGroup row">
            <div className="col-sm-3">
              <label htmlFor="address">Address</label>
            </div>
            <div className="col-sm-9">
              <Input
                theme={style}
                type="text"
                name="address"
                id="address"
                ref={(c) => { this.address = c }}
                value={address}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={style.mapContainer}>
            <Map
              google={this.props.google}
              lat={lat}
              marker={(lat !== '') ? { lat, lng } : null}
              lng={lng}
              onClick={(p, m) => {
                if (this.marker !== null) {
                  this.marker.setMap(null)
                }
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ 'location': p }, (result, status) => {
                  if (status === 'OK') {
                    if (result[1]) {
                      console.log(result[1].formatted_address)
                      this.setState({
                        address: result[1].formatted_address,
                        lat: result[1].geometry.location.lat(),
                        lng: result[1].geometry.location.lng(),
                      })
                    } else {
                      console.log('No result found')
                    }
                  } else {
                    console.log(`Geocode error due to: ${status}`)
                  }
                })
                this.marker = new google.maps.Marker({
                  position: p,
                  map: m
                })
              }}
            />
          </div>
        </div>
      )
    }
    return (
      <h4 className="text-center">Loading...</h4>
    )
  }

  renderAmenities() {
    const { amenitiesList, amenities } = this.state
    if (amenitiesList.length > 0) {
      return amenitiesList.map((d) => {
        const val = amenities.find(a => (a.id === d.id))
        return (
          <Checkbox
            key={v4()}
            checked={val.isChecked}
            label={d.name}
            value={val.id}
            onChange={this.handleChangeAmenities}
          />
        )
      })
    }
    return (
      <h4 className="text-center">Load Amenities...</h4>
    )
  }
  render() {
    const { isProgress, name, address, status_id, base_price, capacity, description, min_stay, max_stay } = this.state
    return (
      <div className={style.formWrapper}>
        <form method="post" className="form form-horizontal" encType="multipart/form-data">
          <Panel title="Basic Information">
            <div className="formGroup row">
              <div className="col-sm-3">
                <label htmlFor="name">Room Name/Title</label>
              </div>
              <div className="col-sm-9">
                <Input theme={style} type="text" id="name" name="name" value={name} onChange={this.handleChange} />
              </div>
            </div>
            <div className="formGroup row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="capacity">Capacity</label>
                  </div>
                  <div className="col-sm-9">
                    <Input min={1} theme={style} theme={style} type="number" name="capacity" value={capacity} id="capacity" onChange={this.handleChange} />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="base_price">Price</label>
                  </div>
                  <div className="col-sm-9">
                    <Input min={1} theme={style} type="number" name="base_price" value={base_price} id="base_price" onChange={this.handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="formGroup row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="min_stay">Min. Stay</label>
                  </div>
                  <div className="col-sm-9">
                    <Input min={1} max={356} theme={style} type="number" name="min_stay" id="min_stay" value={min_stay} onChange={this.handleChange} />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="max_stay">Max. Stay</label>
                  </div>
                  <div className="col-sm-9">
                    <Input max={356} min={1} theme={style} type="number" name="max_stay" id="max_stay" value={max_stay} onChange={this.handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="formGroup row">
              <div className="col-sm-3">
                <label htmlFor="availability">Available</label>
              </div>
              <div className="col-sm-4">
                <RadioGroup name="status_id" value={status_id} onChange={this.handleChange}>
                  <RadioButton label="Yes" value={5} />
                  <RadioButton label="No" value={6} />
                </RadioGroup>
              </div>
            </div>
            <div className="formGroup">
              <div>
                <label htmlFor="description">Description</label>
              </div>
              <div>
                <Input theme={style} type="text" id="description" multiline={true} rows={4} name="description" value={description} onChange={this.handleChange} />
              </div>
            </div>
          </Panel>
          <Panel title="Room Photos">
            <div style={{ width: '450px', margin: 'auto' }}>
              <UploadBox
                hint="Upload your room photos"
                multiple={true}
                callbackChangePict={(files) => {
                  this.files = files
                }}
                onUpload={(files) => {
                  this.files = files
                  this.handleUpload()
                }}
              />
            </div>
          </Panel>
          <Panel title="Location">
            {this.renderLocationComponent()}
          </Panel>
          <Panel title="Room Amenities">
            { this.renderAmenities() }
          </Panel>
          <Button
            type="submit"
            primary={true}
            raised={true}
            onClick={this.handleSubmit}
            disabled={(isProgress)}
            label={(isProgress) ? 'Loading...' : 'Save'}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token.accessToken,
  userId: state.auth.user.id,
})

const mapDispatchToProps = dispatch => ({
  redirect: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: config.GOOGLE_API_KEY,
  libraries: ['places'],
  version: '3.27',
})(FormRoom))
