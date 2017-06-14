import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontIcon from 'react-toolbox/lib/font_icon'
import axios from 'axios'
import config from 'config'
import classnames from 'classnames'
import { GoogleApiWrapper } from 'google-maps-react'
import { v4 } from 'uuid'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

import FormFeedback from '../../components/organisms/FormFeedback'
import Spinner from '../../components/atoms/Spinner'
import Map from '../../components/atoms/Map'
import Anchor from '../../components/atoms/Anchor'
import BookIt from '../../components/organisms/BookIt'
import Image from '../../components/atoms/Image'
import SectionTitle from '../../components/atoms/SectionTitle'
import style from '../styles/Room.css'
import { requestProgress, requestDone } from '../../../common/actions/request'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amenities: [],
      room: null,
      roomRate: [],
      dialogFeedback: false,
    }
    this.renderAmenities = this.renderAmenities.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.renderRate = this.renderRate.bind(this)
    this.renderRoomDetail = this.renderRoomDetail.bind(this)
    this.renderBookItComponent = this.renderBookItComponent.bind(this)
    this.renderFeedback = this.renderFeedback.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  componentWillMount() {
    this.props.requestProgress()
    axios.get(`${config.API_URL}/amenities`)
         .then((response) => {
           this.props.requestDone(response.status, response.statusText)
           this.setState({ amenities: response.data })
         })
         .catch((error) => {
           this.props.requestDone(error.response.status, error.response.statusText)
         })
    axios.get(`${config.API_URL}/rooms/${this.props.params.id}`)
         .then((response) => {
           this.props.requestDone(response.status, response.statusText)
           this.setState({ room: response.data })
         })
         .catch((error) => {
           console.log(error)
           this.props.requestDone(error.response.status, error.response.statusText)
         })
    axios.get(`${config.API_URL}/room-feedbacks/get-by-room/${this.props.params.id}`)
        .then((response) => {
          this.props.requestDone(response.status, response.statusText)
          this.setState({ roomRate: response.data })
        })
        .catch((error) => {
          this.props.requestDone(error.response.status, error.response.statusText)
        })
  }
  handleToggle() {
    this.setState({
      dialogFeedback: !this.state.dialogFeedback,
    })
  }
  renderAmenities() {
    const { amenities, room } = this.state
    if (amenities.length >= 0 && room !== null) {
      const roomAmenities = room.room_amenities
      const amComponent = amenities.map((d) => {
        const rA = roomAmenities.find(a => (a.amenity.id === d.id))
        if (typeof rA !== 'undefined') {
          return (
            <div key={v4()} className="col-xs-12 col-sm-6">
              <div className={style.amenitiesComponent}>
                <FontIcon className={style.amenitiesIcon} value={d.icon} />
                <strong>{rA.description}</strong>
              </div>
            </div>
          )
        }
        return (
          <div key={v4()} className="col-xs-12 col-sm-6">
            <div className={classnames(style.amenitiesComponent, style.amenitiesDisabled)}>
              <del>{d.name}</del>
            </div>
          </div>
        )
      })
      return amComponent
    }
    return <div className="text-center">Loading...</div>
  }
  renderImage() {
    const { room } = this.state
    if (room !== null) {
      return (
        <Image
          src={room.room_pictures[0].url}
          full={true}
          alt={room.name}
        />
      )
    }
    return (
      <Spinner
        size={{
          width: '100%',
          height: '357px',
        }}
      />
    )
  }
  renderRate() {
    const { roomRate } = this.state
    if (roomRate.length > 0) {
      let totalRate = 0
      roomRate.forEach((d) => {
        totalRate += d.rating
      })
      const rate = totalRate / roomRate.length
      let iconRate = ''
      if (rate >= 5) iconRate = 'star'
      else if (rate > 2) iconRate = 'star_half'
      else iconRate = 'star_border'
      return (
        <div className={style.rate}>
          <div>
            <FontIcon className={style.rateIcon} value={iconRate} />
          </div>
          <div className={style.rateText}>
            <b>{rate}</b>
          </div>
          <div>
            <Anchor to="#">
              {roomRate.length} reviews
            </Anchor>
          </div>
        </div>
      )
    }
    return (
      <div className={style.rate}>
        <div>
          <FontIcon className={style.rateIcon} value='star_border' />
        </div>
        <div className={style.rateText}>
          <b>0</b>
        </div>
        <div>
          <Anchor to="#">
            0 reviews
          </Anchor>
        </div>
      </div>
    )
  }
  renderFeedback() {
    const { room } = this.state
    if (room !== null) {
      return (
        <FormFeedback
          roomId={this.state.room.id}
          onSuccess={(rating) => {
            const { roomRate } = this.state
            const newState = [...roomRate, rating]
            this.setState({
              dialogFeedback: false,
              roomRate: newState,
            })
          }}
        />
      )
    }
    return (
      <p className="text-center">Loading...</p>
    )
  }
  renderRoomDetail() {
    const { room } = this.state
    if (room !== null) {
      return (
        <div>
          <div className="row section">
            <div className="col-xs-12 col-md-9">
              <h1 className={style.title}>{room.name}</h1>
              <span className={style.address}>{room.address}</span>
            </div>
            <div className="col-xs-12 col-md-3">
              {this.renderRate()}
            </div>
          </div>
          <section className="section">
            <SectionTitle label="Overview" />
            <h3 className={style.subtitleSection}>About this listing</h3>
            <p>{room.description}</p>
          </section>
          <hr className="section-hr" />
          <section className="section">
            <div className="row">
              <div className="col-xs-12 col-md-3">
                <b>Amenities</b>
              </div>
              <div className="col-xs-12 col-md-9">
                <div className="row">
                  {this.renderAmenities()}
                </div>
              </div>
            </div>
          </section>
          <hr className="section-hr" />
          <section className="section">
            <div className={style.location}>
              <Map
                lat={room.lat}
                google={this.props.google}
                lng={room.lng}
                scrollwheel={false}
                marker={{ lat: room.lat, lng: room.lng, title: room.name }}
              />
            </div>
          </section>
        </div>
      )
    }
    return <div className="text-center">Loading...</div>
  }
  renderBookItComponent() {
    const { room } = this.state
    if (room !== null) {
      console.log(room)
      return (
        <BookIt
          price={room.base_price}
          maxPerson={room.capacity}
          minOrder={room.min_stay}
          maxOrder={room.max_stay}
          roomId={room.id}
        />
      )
    }
    return (
      <Spinner
        size={{
          width: '100%',
          height: '309px',
        }}
      />
    )
  }
  render() {
    return (
      <div className="pageContainer room_dls with-padding">
        <div className="row">
          <div className="col-xs-12 col-md-8 ext-muted">
            <div className={style.imageContainer}>
              {this.renderImage()}
            </div>
            {this.renderRoomDetail()}
          </div>
          <div className="col-xs-12 col-md-4">
            {this.renderBookItComponent()}
            <Button
              label="Add Feedback"
              icon="message"
              className={style.btnFeedback}
              onClick={this.handleToggle}
            />
            <Dialog
              active={this.state.dialogFeedback}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              type="small"
            >
              {this.renderFeedback()}
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isProgress: state.request.isProgress,
})

const mapDispatchToProps = dispatch => ({
  requestDone: bindActionCreators(requestDone, dispatch),
  requestProgress: bindActionCreators(requestProgress, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: config.GOOGLE_API_KEY,
  libraries: ['places'],
  version: '3.27',
})(Detail))
