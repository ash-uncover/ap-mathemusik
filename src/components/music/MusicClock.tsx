import React from 'react'

export interface MusicClockProperties {
}
export const MusicClock = ({
}: MusicClockProperties) => {

  // #region Hooks
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-clock']
  return (
    <div
      className={classes.join(' ')}
    >
      <div className='ap-music-clock-inner' />
    </div>
  )
  // #endregion
}
