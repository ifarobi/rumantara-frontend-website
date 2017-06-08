import React, { Component } from 'react'
import config from 'config'
import { GoogleApiWrapper } from 'google-maps-react'

class Map extends Component {
  constructor(props) {
    super(props)
    const { lat, lng } = this.props
    this.state = {
      lat: lat !== '' || lat !== null ? lat : null,
      lng: lng !== '' || lng !== null ? lng : null,
    }
    this.mapComponent = null
    this.map = null
    this.loadMap = this.loadMap.bind(this)
    this.recenterMap = this.recenterMap.bind(this)
  }
  componentDidMount() {
    this.loadMap()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.lat !== this.state.lat || nextProps.lng !== this.state.lng) {
      this.setState({ lat: nextProps.lat, lng: nextProps.lng })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap()
    }
    if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng) {
      this.recenterMap()
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      const { lat, lng } = this.state
      const { google, scrollwheel, zoom } = this.props
      const maps = google.maps

      const confLat = lat !== '' ? lat : -6.9739024
      const confLng = lng !== '' ? lng : 107.627451
      const center = new maps.LatLng(confLat, confLng)
      const mapConf = Object.assign({}, {
        center,
        zoom,
        scrollwheel,
      })
      this.map = new maps.Map(this.mapComponent, mapConf)
      if (this.props.onClick) {
        this.map.addListener('click', (e) => {
          this.props.onClick(e.latLng, this.map)
        })
      }
      if (this.props.marker !== null) {
        const markerMap = new google.maps.Marker({
          position: {
            lat: this.props.marker.lat,
            lng: this.props.marker.lng,
          },
          title: this.props.marker.title,
        })
        markerMap.setMap(this.map)
      }
    }
  }

  recenterMap() {
    const map = this.map
    const { lat, lng } = this.state
    const { google } = this.props
    const center = new google.maps.LatLng(lat, lng)
    map.panTo(center)
  }

  render() {
    const compStyle = {
      height: '100%',
      postition: 'absolute',
      width: '100%',
    }
    return (
      <div style={compStyle} ref={(c) => { this.mapComponent = c }} className="text-center">
        Load Map...
      </div>
    )
  }
}

Map.defaultProps = {
  scrollwheel: true,
  zoom: 16,
}

export default Map
