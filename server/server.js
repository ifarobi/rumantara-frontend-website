import Express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../common/reducers'

import { match, RouterContext } from 'react-router'
import routes from '../client/routes'
const app = Express()
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const appHtml = renderToString(<RouterContext {...props} />)
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>React Boilerplate by Ilham Farobi </title>
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.min.css">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css" type="text/css" >
      <link rel="stylesheet" media="screen" href="/public/css/toolbox.css">
      <link rel="stylesheet" media="screen" href="/public/css/app.css">
      <link rel="stylesheet" href="/public/css/rumantara.css">
    </head>
    <body>
      <div id="root">${appHtml}</div>
    </body>
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
    <script src="/public/script.bundle.js"></script>
  </html>

  `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
