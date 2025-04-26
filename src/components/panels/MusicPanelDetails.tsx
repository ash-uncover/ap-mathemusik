import React from 'react'

export interface MusicPanelDetailsProperties {
  className: string
}
export const MusicPanelDetails = ({
  className,
}: MusicPanelDetailsProperties) => {

  // #region Hooks
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-panel-details']
  if (className) {
    classes.push(className)
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <button>PLAY</button>
      <button>STOP</button>
    </div>
  )
  // #endregion
}
