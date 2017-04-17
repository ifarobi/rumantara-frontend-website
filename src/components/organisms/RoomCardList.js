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
          title={d.title}
          image={d.image}
          price={price(d.price)}
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
