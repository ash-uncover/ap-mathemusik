import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Loader, useLoadData } from '@sol.ac/games-common'

import { AppLoadStatuses } from '../store/app/app.state'
import { CONFIG } from '../config'

import { AppSlice } from '../store/app/app.slice'

export interface AppLoadingProperties {
}
export const AppLoading = ({
}: AppLoadingProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const [loadValue, setLoadValue] = useState(0)
  const [loadCompleted, setLoadCompleted] = useState(false)
  // #endregion

  // #region Callbacks
  const handleLoadProgress = (value: number) => {
    setLoadValue(value)
  }
  const handleLoadCompleted = () => {
    setLoadCompleted(true)
  }
  // #endregion

  const audios = [
    `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/ball-tap.wav`,
    `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/retro-click.wav`,
    `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/clap.mp3`,
  ]
  const images = []
  useLoadData(
    {
      audios,
      images,
      delayed: true
    },
    handleLoadProgress,
    handleLoadCompleted
  )

  // #region Events
  const handleClick = () => {
    if (loadCompleted) {
      var audio = new Audio(`${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/clap.mp3`);
      setInterval(() => {
        setTimeout(() => {
          console.log('play')
          // audio.play()
        }, 0) 
      }, 100)
      dispatch(AppSlice.actions.setLoadStatus(AppLoadStatuses.STARTED))
    }
  }
  // #endregion

  // #region Rendering
  return (
    <Loader
      value={loadValue}
      onClick={handleClick}
    >
      <div
        style={{
          width: '12rem',
          margin: '0 -1rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
        {loadCompleted ? 'Click to Start' : 'Chargement'}
      </div>
    </Loader>
  )
  // #endregion
}
