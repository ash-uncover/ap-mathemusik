import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'

export interface MusicPanelMainProperties {
  className: string
}
export const MusicPanelMain = ({
  className,
}: MusicPanelMainProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const musicState = useSelector(DataSelectors.musicState)
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
  const classes = ['ap-music-panel-main']
  if (className) {
    classes.push(className)
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <button onClick={handleButtonPlayClick}>
        {musicState === MusicStates.PLAY ? MusicStates.STOP : MusicStates.PLAY}
      </button>
    </div>
  )
  // #endregion
}
