import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BookIt from '../../components/organisms/BookIt'
import style from '../styles/Room.css'
import Image from '../../components/atoms/Image'
import price from '../../../common/helpers/price'
import { requestProgress, requestDone } from '../../../common/actions/request'

class Detail extends Component {
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div className="pageContainer with-padding">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Image
              src="http://lorempixel.com/800/400/city"
              full={true}
              alt="kotaku"
            />
            <h1 className={style.title}>Rumah murah di samping sungai</h1>
          </div>
          <div className="col-xs-12 col-md-4">
            <BookIt
              price={price(2123000)}
              maxPerson={5}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
