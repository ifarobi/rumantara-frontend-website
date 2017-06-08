import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from 'config'
import axios from 'axios'

import { requestProgress, requestDone } from '../../common/actions/request'
import SearchBar from '../components/organisms/SearchBar'
import Hero from '../components/organisms/Hero'
import SectionTitle from '../components/atoms/SectionTitle'
import RoomCardList from '../components/organisms/RoomCardList'
import CardListTitle from '../components/molecules/CardListTitle'

import style from './styles/Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomData: [],
    }
    this.renderRoomList = this.renderRoomList.bind(this)
    this.renderPopularCity = this.renderPopularCity.bind(this)
  }
  componentWillMount() {
    requestProgress()
    axios.get(`${config.API_URL}/rooms/get-with-offset-limit/0/6`)
         .then((response) => {
           this.props.requestDone(response.status, response.statusText)
           this.setState({ roomData: response.data })
         })
         .catch((error) => {
           console.log(error)
           this.props.requestDone(error.response.status, error.response.statusText)
         })
  }
  renderRoomList() {
    if (this.state.roomData.length > 0) {
      return (
        <section className="pageContainer">
          <SectionTitle label="For You" />
          <RoomCardList
            data={this.state.roomData}
          />
        </section>
      )
    }
    return (
      <section className="pageContainer">
        <CardListTitle text="For You" />
        <h3 className="text-center">Loading</h3>
      </section>
    )
  }
  renderPopularCity() {
    return (
      <section className="pageContainer">
        <SectionTitle label="Favorite Destination" />
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-8">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/bali.png" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Bali</b></span>
                  <p>Dengan kebudayaan khas tarian kecak.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/surabaya.jpg" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Surabaya</b></span>
                  <p>Nikmati Jula Juli asli Surabaya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/malang.jpg" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Malang</b></span>
                  <p>Keberagaman topeng budaya.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/jogja.jpg" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Yogyakarta</b></span>
                  <p>Nikmati kekayaan dan keberagaman budaya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-8">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/bandung.png" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Bandung</b></span>
                  <p>Suasana sunda yang menyejukkan.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className={style.cityCard}>
              <div className={style.cityCover}>
                <img src="/public/images/city/jakarta.jpg" className={style.imageBg} alt="Bali" />
              </div>
              <div className={style.cityCardOverlay}>
                <div className={style.cityCardContent}>
                  <span><b>Jakarta</b></span>
                  <p>Perpaduan suasana modern dengan kebudayaan khas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  render() {
    return (
      <div>
        <Hero
          className={style.heroHome}
          backgroundImage="/public/images/hero/hero1.jpg"
        >
          <h1 className={style.textHero}>
            You can live
            <span
              style={{
                color: '#ef5682',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '5px',
                marginLeft: '10px',
              }}
            >everywhere.</span>
          </h1>
          <SearchBar />
        </Hero>
        {this.renderRoomList()}
        {this.renderPopularCity()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
