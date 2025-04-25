import React, { ReactNode } from 'react'

import { MusicCircleNote } from './MusicCircleNote'

export interface MusicCircleProperties {
  notes: (string | null)[]
  children?: ReactNode
}
export const MusicCircle = ({
  notes,
  children
}: MusicCircleProperties) => {

  // #region Hooks
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle']
  return (
    <div
      className={classes.join(' ')}
    >
      {notes.map((note, index) => (
        <MusicCircleNote
          key={`ap-music-circle-note-${index}`}
          note={note}
          position={index}
          period={notes.length}
        />
      ))}
      {children}
    </div>
  )
  // #endregion
}
