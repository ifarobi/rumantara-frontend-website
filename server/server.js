import Express from 'express'
import fs from 'fs'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import configureStore from '../common/store/configureStore'
import routes from '../client/routes'
const app = Express()
app.use('/public', Express.static(path.resolve(__dirname, '../public')))
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const store = configureStore()
    const appHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    )
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  let rootHtml = fs.readFileSync(path.resolve(__dirname, "../index.html"), { encoding: 'utf8' });
  return rootHtml.replace(new RegExp('{container}', 'g'), appHtml)
}

var PORT = process.env.PORT || 8000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
