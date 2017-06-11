import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import config from 'config'
import { v4 } from 'uuid'

import ReservationCard from '../../../components/molecules/ReservationCard'
import Spinner from '../../../components/atoms/Spinner'

class Travel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      data: [],
    }
    this.renderCard = this.renderCard.bind(this)
  }
  componentWillMount() {
    const { accessToken, userId } = this.props
    axios.get(`${config.API_URL}/orders/get-for-hoster/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      this.setState({
        isLoaded: true,
        data: response.data,
      })
    })
  }
  renderCard() {
    const { data } = this.state
    let response = []
    response = data.filter((d) => {
      if (d.room !== null) return true
      return false
    })
    if (response.length > 0) {
      return response.map(r => (
        <ReservationCard
          type="room"
          key={v4()}
          reservation={r}
          onDelete={(id) => {
            const newState = this.state.data.filter(res => (res.id !== id))
            this.setState({ data: newState })
          }}
        />
      ))
    }
    return <h3 className="text-center">You don&#39;t have any order.</h3>
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          {this.renderCard()}
        </div>
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
}

const mapStateToProps = state => ({
  accessToken: state.auth.token.accessToken,
  userId: state.auth.user.id,
})

export default connect(mapStateToProps)(Travel)
