import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontIcon from 'react-toolbox/lib/font_icon'
import axios from 'axios'
import config from 'config'
import classnames from 'classnames'
import { v4 } from 'uuid'

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
    }
    this.renderAmenities = this.renderAmenities.bind(this)
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
  }
  renderAmenities() {
    const { amenities, room } = this.state
    if (amenities.length >= 0 && room !== null) {
      const roomAmenities = room.room_amenities
      const amComponent = amenities.map((d) => {
        const rA = roomAmenities.find((a) => {
          return (a.id === d.id)
        })
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
  render() {
    return (
      <div className="pageContainer room_dls with-padding">
        <div className="row">
          <div className="col-xs-12 col-md-8 ext-muted">
            <Image
              src="http://lorempixel.com/800/400/city"
              full={true}
              alt="kotaku"
            />
            <div className="row section">
              <div className="col-xs-12 col-md-9">
                <h1 className={style.title}>Rumah murah di samping sungai</h1>
                <span className={style.address}>Rotterdam, South Holland, Netherlands</span>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className={style.rate}>
                  <div>
                    <FontIcon className={style.rateIcon} value="star_half" />
                  </div>
                  <div className={style.rateText}>
                    <b>4.5</b>
                  </div>
                  <div>
                    <Anchor to="#">
                      322 reviews
                    </Anchor>
                  </div>
                </div>
              </div>
            </div>
            <section className="section">
              <SectionTitle label="Overview" />
              <h3 className={style.subtitleSection}>About this listing</h3>
              <p>For each rental, $50 will be donated to Raphael House, a San Francisco organization whose goal is to help at-risk families achieve stable housing and financial independence.</p>
              <p>This little a-frame cabin would make a productive retreat for an artist, writer, or musician, or a romantic getaway. Surrounded by redwoods on a private road in Cazadero, my cabin is an hour and forty-five minutes north of San Francisco: a roughly ten-minute drive to the beautiful Sonoma Coast, and just fifteen minutes to Guerneville and wine country in the other direction. Head west and you’ll hit the charming town of Duncans Mills; go east to Monte Rio, and catch a movie at the historic Rio Theater.</p>
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
