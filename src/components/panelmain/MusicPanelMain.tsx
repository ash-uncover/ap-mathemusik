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
  const circles = useSelector(DataSelectors.circles)
  // #endregion

  // #region Callbacks
  function handleButtonAddClick() {
    dispatch(DataSlice.actions.addCircle())
  }
  function handleButtonDeleteCircleClick(index: number) {
    dispatch(DataSlice.actions.deleteCircle(index))
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
      <div>
        <h4>Circles</h4>
        <button onClick={handleButtonAddClick}>
          +
        </button>
        <ul>
          {circles.map((circle, index) => {
            return (
              <li>{`Circle n°${index + 1}`} <button onClick={() => handleButtonDeleteCircleClick(index)}>X</button></li>
            )
          })}
        </ul>
      </div>

    </div>
  )
  // #endregion
}
