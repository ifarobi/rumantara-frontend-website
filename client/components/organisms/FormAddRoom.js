import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import Checkbox from 'react-toolbox/lib/checkbox'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import { v4 } from 'uuid'

import config from 'config'
import Panel from '../organisms/Panel'
import style from './styles/Room.css'
import UploadBox from '../organisms/UploadBox'
import Map from '../atoms/Map'
import { storage } from '../../../common/helpers/firebase'

class FormAddRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      lat: '',
      lng: '',
      base_price: '',
      capacity: '',
      description: '',
      min_stay: '',
      max_stay: '',
      pictures: [],
      marker: null,
      amenitiesList: [],
      amenities: [],
    }
    this.address = null
    this.marker = null
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.renderLocationComponent = this.renderLocationComponent.bind(this)
    this.renderAmenities = this.renderAmenities.bind(this)
    this.handleChangeAmenities = this.handleChangeAmenities.bind(this)
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
  handleUpload(files,name) {
    const storageRef = storage.ref()
    const meta = {
      contentType: 'image/jpeg',
    }
    const now = new Date()
    const newImage = storageRef.child(`images/rooms/${now.getTime()}.jpg`)
    newImage.put(files[0], meta).then((snap) => {
      console.log('uploaded')
      console.log(snap.downloadURL)
      this.handleChange(snap.downloadURL, {
        target: {
          name,
        },
      })
    })
  }
  renderLocationComponent() {
    const { google, loaded } = this.props
    const { address, lat, lng } = this.state
    if (loaded) {
      if (this.address !== null) {
        const autocomplete = new google.maps.places.Autocomplete(
          this.address.refs.wrappedInstance.inputNode,
          {types: ['geocode']}
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
              lng={lng}
              onClick={(p, m) => {
                if (this.marker !== null) {
                  this.marker.setMap(null)
                }
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ 'location': p }, (result, status) => {
                  if (status === 'OK') {
                    if (result[1]) {
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
    const { name, address, base_price, capacity, description, min_stay, max_stay } = this.state
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
                    <label htmlFor="price">Price</label>
                  </div>
                  <div className="col-sm-9">
                    <Input min={1} theme={style} theme={style} type="number" name="price" value={base_price} id="price" onChange={this.handleChange} />
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
            <UploadBox
              hint="Upload your room photos"
              multiple={true}
              onUpload={(files) => {
                this.handleUpload(files)
              }}
            />
          </Panel>
          <Panel title="Location">
            {this.renderLocationComponent()}
          </Panel>
          <Panel title="Room Amenities">
            { this.renderAmenities() }
          </Panel>
        </form>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_API_KEY,
  libraries: ['places'],
  version: '3.27',
})(FormAddRoom)
