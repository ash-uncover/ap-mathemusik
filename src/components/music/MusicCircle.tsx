import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MusicCircleNote } from './MusicCircleNote'
import { MusicStates, Note } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'
import { getRefCenter } from '../../lib/ref'
import { getAngleDegree } from '../../lib/geometric'

import './MusicCircle.css'

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
  const [selected, setSelected] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const circleHovered = useSelector(DataSelectors.circleHovered)
  const circleSelected = useSelector(DataSelectors.circleSelected)
  const circleDraging = useSelector(DataSelectors.circleDraging)
  const circle = useSelector(DataSelectors.circleByKey(circleKey))
  const musicState = useSelector(DataSelectors.musicState)
  const ref = useRef(null)
  useEffect(() => {
    if (musicState !== MusicStates.PLAY && circleSelected !== circleKey && circleHovered === circleKey && !hovered) {
      setHovered(true)
    } else if (hovered) {
      setHovered(false)
    }
  }, [circleSelected, circleHovered, musicState])
  useEffect(() => {
    if (musicState !== MusicStates.PLAY && circleSelected === circleKey && !selected) {
      setSelected(true)
    } else if (selected) {
      setSelected(false)
    }
  }, [circleSelected, musicState])
  useEffect(() => {
    if (musicState !== MusicStates.PLAY && circleDraging?.key === circleKey && !dragging) {
      setDragging(true)
    } else if (dragging) {
      setDragging(false)
    }
  }, [circleDraging, musicState])
  useEffect(() => {
    if (circleDraging?.key === circleKey) {
      const _handleDocumentMouseMove = handleDocumentMouseMove.bind(this)
      const _handleDocumentMouseUp = handleDocumentMouseUp.bind(this)
      document.addEventListener('mousemove', _handleDocumentMouseMove)
      document.addEventListener('mouseup', _handleDocumentMouseUp)
      return () => {
        document.removeEventListener('mouseup', _handleDocumentMouseUp)
        document.removeEventListener('mousemove', _handleDocumentMouseMove)
      }
    }
  }, [circleDraging])
  // #endregion

  // #region Callbacks
  function handleDocumentMouseMove(e: React.MouseEvent<HTMLElement>) {
    const center = getRefCenter(ref.current)
    const angle = getAngleDegree(center, { x: e.clientX, y: e.clientY })
    const rotate = (360 + angle - circleDraging.initialAngle + circle.rotate) % 360
    dispatch(DataSlice.actions.updateCircleRotate({ key: circleKey, rotate }))
  }
  function handleDocumentMouseUp(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    dispatch(DataSlice.actions.dragCircleStop())
  }
  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    if (!circleDraging) {
      dispatch(DataSlice.actions.enterCircle(circleKey))
    }
  }
  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    if (!circleDraging) {
      dispatch(DataSlice.actions.leaveCircle(circleKey))
    }
  }
  function handleMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (musicState !== MusicStates.PLAY) {
      e.stopPropagation()
      const center = getRefCenter(ref.current)
      const angle = getAngleDegree(center, { x: e.clientX, y: e.clientY })
      dispatch(DataSlice.actions.dragCircleStart({
        key: circleKey,
        initialAngle: angle
      }))
    }
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle']
  if (hovered) {
    classes.push('ap-music-circle--hover')
  }
  if (selected) {
    classes.push('ap-music-circle--selected')
  }
  if (dragging) {
    classes.push('ap-music-circle--dragging')
  }
  return (
    <div
      ref={ref}
      className={classes.join(' ')}

    >
      <div
        className='ap-music-circle_inner'
        style={{
          rotate: `${circle.rotate}deg`
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
      >
        <div
          className='ap-music-circle_notes'
        >
          {notes.map((note, index) => (
            <MusicCircleNote
              key={`ap-music-circle-note-${circleKey}-${index}`}
              circleKey={circleKey}
              note={note.sound}
              position={index}
              period={notes.length}
            />
          ))}
        </div>
      </div>

      <div
        className='ap-music-circle_children'
      >
        {children}
      </div>
    </div>
  )
  // #endregion
}
