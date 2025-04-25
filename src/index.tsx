import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  Route,
  Routes,
  BrowserRouter,
  HashRouter,
  Navigate,
} from 'react-router-dom'

// Import icons
import 'lib/icons'

// Should be imported before first access to the reducers
import { store } from './store'
import { App } from './components/App'
import { CONFIG } from './config'
import { AudioProvider } from './lib/audio/AudioProvider'

let Router = BrowserRouter
if (CONFIG.AP_MATHEMUSIK_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <Router>
    <AudioProvider>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Route>
        </Routes>
      </Provider>
    </AudioProvider>
  </Router>
)
