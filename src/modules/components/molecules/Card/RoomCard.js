import React from 'react'

import Box from 'grommet/components/Box'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'

import { price } from '../../../../helper/price'

import Style from './styles/RoomCard.css'

const RoomCard = ({data}) => (
  <Box className={Style.boxContainer}
    size="medium"
    margin="small">
    <div className={Style.imageWrapper}>
      <Image src={data.image} fit="cover" full={true}/>
    </div>
    <div className={Style.descWrapper}>
      <div>
        <Label className={Style.price}>{price(data.price)}</Label>
      </div>
      <Heading tag="h4">
        {data.title}
      </Heading>
    </div>
  </Box>
)

export default RoomCard
