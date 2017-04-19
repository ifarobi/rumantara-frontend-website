import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from 'config'
import axios from 'axios'

import { requestProgress, requestDone } from '../actions/request'
import SearchBar from '../components/organisms/SearchBar'
import Hero from '../components/organisms/Hero'
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
  }
  componentWillMount() {
    requestProgress()
    axios.get(`${config.API_URL}/rooms`)
         .then((response) => {
           this.props.requestDone(response.status, response.statusText)
           this.setState({ roomData: response.data })
         })
         .catch((error) => {
           this.props.requestDone(error.response.status, error.response.statusText)
         })
  }
  renderRoomList() {
    if (this.state.roomData) {
      return (
        <section className="pageContainer">
          <CardListTitle text="For You" />
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
