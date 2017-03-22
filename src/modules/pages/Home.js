import React, {Component} from 'react';

import Primary from '../components/templates/Primary';

export default class Home extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Primary>
        <h2>Hello From Home</h2>
      </Primary>
    )
  }
}
