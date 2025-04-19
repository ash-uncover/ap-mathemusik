import React, { ReactNode } from 'react'

import './Music.css'

export interface MusicContainerProperties {
  children: ReactNode
}
export const MusicContainer = ({
  children
}: MusicContainerProperties) => {

  // #region Hooks
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-container']
  return (
    <div
      className={classes.join(' ')}
    >
      {children}
    </div>
  )
  // #endregion
}
