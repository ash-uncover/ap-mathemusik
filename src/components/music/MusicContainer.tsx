import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Circle, MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'

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
  const dispatch = useDispatch()
  const musicState = useSelector(DataSelectors.musicState)
  const circles = useSelector(DataSelectors.circles)
  // #endregion

  // #region Callbacks
  function handleButtonPlayClick() {
    if (musicState === MusicStates.STOP) {
      dispatch(DataSlice.actions.setMusicState(MusicStates.PLAY))
    } else {
      dispatch(DataSlice.actions.setMusicState(MusicStates.STOP))
    }
  }
  // #endregion

  // #region Rendering
  function renderCircles(cs: Circle[]) {
    if (cs.length === 0) {
      return (
        <MusicClock />
      )
    }
    const c = cs[0]
    return (
      <MusicCircle notes={c.notes} circleKey={c.key}>
        {renderCircles(cs.slice(1, cs.length))}
      </MusicCircle>
    )
  }
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
      <button
        className='ap-music-container_button-play'
        onClick={handleButtonPlayClick}
      >
        {musicState === MusicStates.PLAY ? MusicStates.STOP : MusicStates.PLAY}
      </button>
    </div>
  )
  // #endregion
}
