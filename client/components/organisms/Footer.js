import React from 'react'

import { Link } from 'react-router'
import style from './styles/Footer.css'

const Footer = () => (
  <div className={style.footerContainer}>
    <div className="pageContainer">
      <div className="row">
        <div className="col-md-3 sectionFooter col-xs-12">
          <h3 className={style.title}>Customer Service</h3>
          <ul className={style.listLinkFooter}>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/sitemap">Site Map</Link>
            </li>
            <li>
              <a href="tel:+6282331012211">Phone / WA: 082331012211</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 sectionFooter col-xs-12">
          <h3 className={style.title}>Rumantara</h3>
          <ul className={style.listLinkFooter}>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/privacy-policies">Privacy & Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 sectionFooter col-xs-12">
          <h3 className={style.title}>Hosting</h3>
          <ul className={style.listLinkFooter}>
            <li>
              <Link to="/why-host">Why Host</Link>
            </li>
            <li>
              <Link to="/responsible-host">Responsible Host</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 sectionFooter col-xs-12">
          <h3 className={style.title}>Find Us</h3>
          <div className={style.socialContainer}>
            <a href="https://facebook.com/">
              <i className="icon-social-facebook" />
            </a>
            <a href="https://facebook.com/">
              <i className="icon-social-instagram" />
            </a>
            <a href="https://facebook.com/">
              <i className="icon-social-twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className={style.copyright}>
      Made with &hearts; by Rumantara. All Rights Reserved.
    </div>
  </div>
)

export default Footer
