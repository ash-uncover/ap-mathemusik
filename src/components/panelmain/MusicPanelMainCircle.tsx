import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'

import './MusicPanelMainCircle.css'

export interface MusicPanelMainCircleProperties {
  className?: string
  index: number
}
export const MusicPanelMainCircle = ({
  className,
  index,
}: MusicPanelMainCircleProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const musicState = useSelector(DataSelectors.musicState)
  const circle = useSelector(DataSelectors.circleByIndex(index))
  const circleHovered = useSelector(DataSelectors.circleHovered)
  // #endregion

  // #region Callbacks
  function handleMouseOver() {
    dispatch(DataSlice.actions.enterCircle(circle.key))
  }
  function handleMouseOut() {
    dispatch(DataSlice.actions.leaveCircle(circle.key))
  }
  function handleButtonDeleteCircleClick(index: number) {
    dispatch(DataSlice.actions.deleteCircle(index))
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-panel-main-circle']
  if (className) {
    classes.push(className)
  }
  if (circleHovered === circle.key) {
    classes.push('ap-music-panel-main-circle--hover')
  }
  return (
    <li
      className={classes.join(' ')}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className='ap-music-panel-main-circle_text'>
        {`Circle n°${index + 1}`}
      </span>
      <button 
        className='ap-music-panel-main-circle_button-delete'
        onClick={() => handleButtonDeleteCircleClick(index)}
        disabled={musicState === MusicStates.PLAY}
      >
        X
      </button>
    </li>
  )
  // #endregion
}
