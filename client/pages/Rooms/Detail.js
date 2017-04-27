import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Anchor from '../../components/atoms/Anchor'
import FontIcon from 'react-toolbox/lib/font_icon'
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
          <div className="col-xs-12 col-md-8 ext-muted">
            <Image
              src="http://lorempixel.com/800/400/city"
              full={true}
              alt="kotaku"
            />
            <div className="row">
              <div className="col-xs-12 col-md-9">
                <h1 className={style.title}>Rumah murah di samping sungai</h1>
                <span className={style.address}>Rotterdam, South Holland, Netherlands</span>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className={style.rate}>
                  <div>
                    <FontIcon className={style.rateIcon} value="star_half" />
                  </div>
                  <div className={style.rateText}>
                    <b>4.5</b>
                  </div>
                  <div>
                    <Anchor to="#">
                      322 reviews
                    </Anchor>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <BookIt
              price={price(2123000)}
              maxPerson={5}
              minOrder={2}
              maxOrder={6}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
