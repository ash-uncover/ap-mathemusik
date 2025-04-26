import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { AppSelectors } from '../store/app/app.selector'
import { AppLoadStatuses } from '../store/app/app.state'

import { MusicCircle } from './music/MusicCircle'
import { MusicContainer } from './music/MusicContainer'
import { MusicClock } from './music/MusicClock'

import './App.css'
import { AppLoading } from './AppLoading'
import { AudioProviderContext, AudioProviderDispatchContext } from '../lib/audio/AudioProvider'
import { CONFIG } from '../config'
import { useLoadAudio } from '../lib/audio/AudioHooks'
import { MusicPanelMain } from './panelmain/MusicPanelMain'
import { MusicPanelDetails } from './paneldetails/MusicPanelDetails'

export const App = () => {

  // #region Hooks
  const ref = useRef(null)
  const refScroll = useRef(0)
  const location = useLocation()
  const [scrolling, setScrolling] = useState(false)
  const loadStatus = useSelector(AppSelectors.loadStatus)

  const audioContext = useContext(AudioProviderContext)
  const dispatch = useContext(AudioProviderDispatchContext)
  useEffect(() => {
    useLoadAudio(audioContext, dispatch, `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/clap.mp3`, 'clap')
    useLoadAudio(audioContext, dispatch, `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/ball-tap.wav`, 'ball')
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0
      refScroll.current = 0
      setScrolling(false)
    }
  }, [location])
  // #endregion

  // #region Callbacks
  function handleScrollMain(e: any) {
    if (e.target.scrollTop > 40) {
      const scrolling = refScroll.current < e.target.scrollTop
      setScrolling(scrolling)
    }
    refScroll.current = e.target.scrollTop
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-app']
  if (scrolling) {
    classes.push('ap-app--scrolled')
  }

  switch (loadStatus) {
    case AppLoadStatuses.NONE:
    case AppLoadStatuses.LOADING:
    case AppLoadStatuses.READY: {
      return (
        <div className={classes.join(' ')}>
          <AppLoading />
        </div>
      )
    }
    case AppLoadStatuses.STARTED: {
      return (
        <div className={classes.join(' ')}>
          <header className='ap-app-header'></header>
          <main className='ap-app-main'>
            <MusicPanelMain className='ap-app-side ap-app-side--left' />
            <MusicContainer className='ap-app-content' />
            <MusicPanelDetails className='ap-app-side ap-app-side--right' />
          </main>
          <footer className='ap-app-footer'>ash-uncover 2025</footer>
        </div>
      )
    }
  }
  // #endregion
  /*
  <MusicCircle notes={[true, false, true, true, false, true, true, false, true, false, true, true, false, true, true, false, true, false, true, true, false, true, true, false]}>
              <MusicCircle notes={[true, false, true, true, false, true, true, false]}>
              </MusicCircle>
            </MusicCircle>
            */
}
