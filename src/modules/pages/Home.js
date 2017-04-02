import React, {Component} from 'react';

import Box from 'grommet/components/Box'

import Primary from '../components/templates/Primary';
import Hero from '../components/organisms/Hero/ImageAndSearch'
import RoomCardList from '../components/organisms/CardList/RoomCardList'

import faker from 'faker'

export default class Home extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Primary>
        <Hero/>
        <Box className="container">
          <RoomCardList title="For You"
            data={[
              {
                id: 0,
                image: faker.image.city(),
                price: faker.finance.amount(),
                title: faker.commerce.productName()
              },
              {
                id: 1,
                image: faker.image.city(),
                price: faker.finance.amount(),
                title: faker.commerce.productName()
              },
              {
                id: 2,
                image: faker.image.city(),
                price: faker.finance.amount(),
                title: faker.commerce.productName()
              }
            ]}
          />
        </Box>
      </Primary>
    )
  }
}
