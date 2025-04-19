import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import { DataSelectors } from '../store/data/data.selectors'
import AppSelectors from '../store/app/app.selector'
import { AppLoadStatuses } from '../store/app/app.state'

import { MusicCircle } from './music/MusicCircle'
import { MusicContainer } from './music/MusicContainer'
import { MusicClock } from './music/MusicClock'

import './App.css'
import { AppLoading } from './AppLoading'

export const App = () => {

  // #region Hooks
  const ref = useRef(null)
  const refScroll = useRef(0)
  const location = useLocation()
  const [scrolling, setScrolling] = useState(false)
  const loadStatus = useSelector(AppSelectors.loadStatus)
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
          <MusicContainer>
                <MusicCircle notes={[true, false, true, true, false]}>
                  <MusicClock />
                </MusicCircle>
            
          </MusicContainer>
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
