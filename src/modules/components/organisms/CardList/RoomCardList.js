import React, { Component } from 'react'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'

import RoomCard from '../../molecules/Card/RoomCard'

class RoomCardList extends Component {
  constructor(props){
    super(props)
    this.renderCards = this.renderCards.bind(this)
  }
  renderCards() {
    return this.props.data.map(room => <RoomCard key={room.id} data={room}/>)
  }
  render() {
    console.log(this.renderCards())
    const { title } = this.props
    return(
      <Section>
        <Heading tag='h3'>
          {title}
        </Heading>
        <Box direction="row">
          {this.renderCards()}
        </Box>
      </Section>
    )
  }
}

RoomCardList.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array
}


export default RoomCardList
