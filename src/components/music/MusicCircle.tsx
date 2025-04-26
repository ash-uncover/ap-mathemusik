import React, { MouseEventHandler, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MusicCircleNote } from './MusicCircleNote'
import { Note } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'

export interface MusicCircleProperties {
  circleKey: string
  notes: Note[]
  children?: ReactNode
}
export const MusicCircle = ({
  circleKey,
  notes,
  children
}: MusicCircleProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const circleHovered = useSelector(DataSelectors.circleHovered)
  // #endregion

  // #region Callbacks
  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    dispatch(DataSlice.actions.enterCircle(circleKey))
  }
  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    dispatch(DataSlice.actions.leaveCircle(circleKey))
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle']
  if (circleHovered === circleKey) {
    classes.push('ap-music-circle--hover')
  }
  return (
    <div
      className={classes.join(' ')}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {notes.map((note, index) => (
        <MusicCircleNote
          key={`ap-music-circle-note-${circleKey}-${index}`}
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
