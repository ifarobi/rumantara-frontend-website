import React, { Component } from 'react'

import price from '../../../common/helpers/price'
import RoomCard from '../molecules/RoomCard'

class RoomCardList extends Component {
  constructor(props) {
    super(props)
    this.renderCards = this.renderCards.bind(this)
    console.log(this.props.data)
  }
  renderCards() {
    return this.props.data.map(d => (
      <div className="col-xs-12 col-md-4" key={d.id}>
        <RoomCard
          title={d.name}
          id={d.id}
          image={(d.room_pictures.length > 0) ? d.room_pictures[0].url : 'http://lorempixel.com/400/200/city'}
          price={price(d.base_price)}
        />
      </div>
      ))
  }
  render() {
    return (
      <div className="grid-only-pad-xs">
        <div className="row">
          {this.renderCards()}
        </div>
      </div>
    )
  }
}


export default RoomCardList
