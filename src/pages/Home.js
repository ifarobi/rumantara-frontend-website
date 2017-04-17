import React from 'react'

import SearchBar from '../components/organisms/SearchBar'
import Primary from '../components/templates/Primary'
import Hero from '../components/organisms/Hero'
import RoomCardList from '../components/organisms/RoomCardList'
import CardListTitle from '../components/molecules/CardListTitle'

import style from './styles/Home.css'

const Home = () => (
  <Primary>
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
    <section className="pageContainer">
      <CardListTitle text="For You" />
      <RoomCardList
        data={[
          {
            id: 0,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
          {
            id: 1,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
          {
            id: 2,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
          {
            id: 3,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
          {
            id: 4,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
          {
            id: 5,
            title: 'Rumah Murah Serius',
            image: 'http://lorempixel.com/400/200/city',
            subtitle: 'dengan desain yang fantastis dan romantis tapi tidak mistis',
            price: 900000,
          },
        ]}
      />
    </section>
  </Primary>
)

export default Home
