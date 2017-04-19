import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import price from '../../helpers/price'

import RoomCard from '../molecules/RoomCard'

class RoomCardList extends Component {
  constructor(props) {
    super(props)
    this.renderCards = this.renderCards.bind(this)
  }
  renderCards() {
    return this.props.data.map(d => (
      <Col key={d.id} xs={12} md={4}>
        <RoomCard
          title={d.name}
          image={(d.image) ? d.image : 'http://lorempixel.com/400/200/city'}
          price={price(d.base_price)}
        />
      </Col>
      ))
  }
  render() {
    return (
      <Grid fluid={true} className="grid-only-pad-xs">
        <Row>
          {this.renderCards()}
        </Row>
      </Grid>
    )
  }
}


export default RoomCardList
