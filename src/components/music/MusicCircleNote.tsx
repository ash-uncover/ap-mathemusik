import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AudioProviderActions, AudioProviderDispatchContext } from '../../lib/audio/AudioProvider'

import { DataSelectors } from '../../store/data/data.selectors'
import { MusicStates } from '../../lib/model'

import './MusicCircleNote.css'

export interface MusicCircleNoteProperties {
  circleKey: string
  note: string | null
  period: number
  position: number
}
export const MusicCircleNote = ({
  circleKey,
  note,
  period,
  position
}: MusicCircleNoteProperties) => {

  // #region Hooks
  const duration = useSelector(DataSelectors.duration)
  const [rotate, setRotate] = useState(0)
  const [delay, setDelay] = useState(0)
  const musicState = useSelector(DataSelectors.musicState)
  const circleDraging = useSelector(DataSelectors.circleDraging)
  const circle = useSelector(DataSelectors.circleByKey(circleKey))
  const dispatch = useContext(AudioProviderDispatchContext)
  function sound() {
    if (note) {
      const action = AudioProviderActions.playAudio(note)
      dispatch(action)
    }
  }
  useEffect(() => {
    setRotate(360 * position / period)
  }, [position, period])
  useEffect(() => {
    if (!circleDraging) {
      const newDelay = (duration * position / period + (circle.rotate * duration / 360)) % duration
      setDelay(newDelay)
    }
  }, [duration, position, period, circle, circleDraging])
  useEffect(() => {
    if (note && musicState === MusicStates.PLAY) {
      let soundTimeout = setTimeout(() => {
        sound()
      }, delay * 1000)
      const soundInterval = setInterval(() => {
        soundTimeout = setTimeout(() => {
          sound()
        }, delay * 1000)
      }, duration * 1000)

      return () => {
        clearTimeout(soundTimeout)
        clearInterval(soundInterval)
      }
    }
  }, [delay, musicState, note, duration])
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle-note']
  if (note) {
    classes.push('ap-music-circle-note--active')
  }
  return (
    <div
      className={classes.join(' ')}
      style={{
        transform: `rotate(${rotate}deg)`,
        // @ts-ignore
        '--ap-music-delay': `${delay}s`
      }}
    >
      <div className='ap-music-circle-note-inner'>
      </div>
    </div>
  )
  // #endregion
}
