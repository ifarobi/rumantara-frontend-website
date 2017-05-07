import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontIcon from 'react-toolbox/lib/font_icon'
import axios from 'axios'
import config from 'config'
import classnames from 'classnames'
import { v4 } from 'uuid'

import Spinner from '../../components/atoms/Spinner'
import Anchor from '../../components/atoms/Anchor'
import BookIt from '../../components/organisms/BookIt'
import Image from '../../components/atoms/Image'
import SectionTitle from '../../components/atoms/SectionTitle'
import price from '../../../common/helpers/price'
import style from '../styles/Room.css'
import { requestProgress, requestDone } from '../../../common/actions/request'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amenities: [],
      room: null,
      roomRate: [],
    }
    this.renderAmenities = this.renderAmenities.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.renderRate = this.renderRate.bind(this)
    this.renderRoomDetail = this.renderRoomDetail.bind(this)
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
      console.log(roomRate)
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
    return <div className="text-center">Calculating...</div>
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
        </div>
      )
    }
    return <div className="text-center">Loading...</div>
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
            <BookIt
              price={price(2123000)}
              maxPerson={5}
              minOrder={2}
              maxOrder={6}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
