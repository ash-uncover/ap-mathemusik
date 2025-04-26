import React from 'react'
import { useSelector } from 'react-redux'

import { Circle, MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'

import { MusicClock } from './MusicClock'
import { MusicCircle } from './MusicCircle'

import './Music.css'

export interface MusicContainerProperties {
  className?: string
}
export const MusicContainer = ({
  className
}: MusicContainerProperties) => {

  // #region Hooks
  const musicState = useSelector(DataSelectors.musicState)
  const circles = useSelector(DataSelectors.circles)
  // #endregion

  // #region Callbacks
  function renderCircles(cs: Circle[]) {
    if (cs.length === 0) {
      return (
        <MusicClock />
      )
    }
    const c = cs[0]
    return (
      <MusicCircle notes={c.notes}>
        {renderCircles(cs.slice(1, cs.length))}
      </MusicCircle>
    )
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-container']
  if (className) {
    classes.push(className)
  }
  if (musicState === MusicStates.PLAY) {
    classes.push('ap-music-container--play')
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <div className='ap-music-container_content'>
        {renderCircles(circles)}
      </div>
    </div>
  )
  // #endregion
}
