import React, { ReactNode } from 'react'

import './Music.css'

export type MusicState =
  | 'STOP'
  | 'PLAY'
export const MusicStates: {
  STOP: MusicState
  PLAY: MusicState
} = {
  STOP: 'STOP',
  PLAY: 'PLAY',
}
export interface MusicContainerProperties {
  children: ReactNode
}
export const MusicContainer = ({
  children
}: MusicContainerProperties) => {

  // #region Hooks
  const [state, setState] = React.useState<MusicState>(MusicStates.STOP)
  // #endregion

  // #region Callbacks
  function handleButtonPlayClick() {
    if (state === MusicStates.STOP) {
      setState(MusicStates.PLAY)
    } else {
      setState(MusicStates.STOP)
    }
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-container']
  if (state === MusicStates.PLAY) {
    classes.push('ap-music-container--play')
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <div className='ap-music-container_content'>
        {children}
      </div>
      <div>
        <button
          onClick={handleButtonPlayClick}
        >
          {state === MusicStates.PLAY ? 'STOP' : 'PLAY'}
          </button>
      </div>
    </div>
  )
  // #endregion
}
