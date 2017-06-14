import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import config from 'config'
import { v4 } from 'uuid'

import BillCard from '../../../components/molecules/BillCard'
import Spinner from '../../../components/atoms/Spinner'

class Paid extends Component {
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
    axios(`${config.API_URL}/bills/get-traveller-bills/${userId}`, {
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
    const unpaidData = data.filter(d => (d.status.id === 11 && d.order !== null))
    if (unpaidData.length > 0) {
      return unpaidData.map(d => (<BillCard key={v4()} bill={d} />))
    }
    return (
      <h3 className="text-center">You don&#39;t have any paid transaction</h3>
    )
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

export default connect(mapStateToProps)(Paid)
