import React, { ReactNode } from 'react'

import { MusicCircleNote } from './MusicCircleNote'
import { Note } from '../../lib/model'

export interface MusicCircleProperties {
  notes: Note[]
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
          note={note.sound}
          position={index}
          period={notes.length}
        />
      ))}
      {children}
    </div>
  )
  // #endregion
}
