import React from 'react'

import faker from 'faker'

import Box from 'grommet/components/Box'

import Primary from '../components/templates/Primary'
import Hero from '../components/organisms/Hero/ImageAndSearch'
import RoomCardList from '../components/organisms/CardList/RoomCardList'


const Home = () => (
  <Primary>
    <Hero />
    <Box className="container">
      <RoomCardList
        title="For You"
        data={[
          {
            id: 0,
            image: faker.image.city(),
            price: faker.finance.amount(),
            title: faker.commerce.productName(),
          },
          {
            id: 1,
            image: faker.image.city(),
            price: faker.finance.amount(),
            title: faker.commerce.productName(),
          },
          {
            id: 2,
            image: faker.image.city(),
            price: faker.finance.amount(),
            title: faker.commerce.productName(),
          },
        ]}
      />
    </Box>
  </Primary>
)

export default Home
