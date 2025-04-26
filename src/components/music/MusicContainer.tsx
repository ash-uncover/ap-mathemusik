import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'

import './Music.css'

export interface MusicContainerProperties {
  children: ReactNode
}
export const MusicContainer = ({
  children
}: MusicContainerProperties) => {

  // #region Hooks
  const musicState = useSelector(DataSelectors.musicState)
  const circles = useSelector(DataSelectors.circles)
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-container']
  if (musicState === MusicStates.PLAY) {
    classes.push('ap-music-container--play')
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <div className='ap-music-container_content'>
        {children}
      </div>
    </div>
  )
  // #endregion
}
