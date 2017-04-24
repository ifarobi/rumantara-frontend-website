import React from 'react'

import style from './styles/Image.css'

const Image = ({ full, size, src, alt }) => {
  const width = full ? '100%' : `${size.width}px`
  const height = full ? 'auto' : `${size.height}px`
  return (
    <div
      style={{
        width,
        height,
      }}
      className={style.imageContainer}
    >
      <img className={style.image} src={src} alt={alt} />
    </div>
  )
}

Image.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }),
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  full: React.PropTypes.bool,
}

export default Image
