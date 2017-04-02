import React, {Component} from 'react';

import Primary from '../components/templates/Primary';
import Hero from '../components/organisms/Hero/ImageAndSearch'

export default class Home extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Primary>
        <Hero/>
      </Primary>
    )
  }
}
