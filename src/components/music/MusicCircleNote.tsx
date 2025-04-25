import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { DataSelectors } from '../../store/data/data.selectors'
import { AudioProviderActions, AudioProviderContext, AudioProviderDispatchContext } from '../../lib/audio/AudioProvider'

export interface MusicCircleNoteProperties {
  note: string | null
  period: number
  position: number
}
export const MusicCircleNote = ({
  note,
  period,
  position
}: MusicCircleNoteProperties) => {

  // #region Hooks
  const duration = useSelector(DataSelectors.duration)
  const [rotate, setRotate] = useState(0)
  const [delay, setDelay] = useState(0)
  const audioContext = useContext(AudioProviderContext)
  const dispatch = useContext(AudioProviderDispatchContext)
  function sound() {
    if (note) {
      const action = AudioProviderActions.playAudio(note)
      dispatch(action)
    }
  }
  useEffect(() => {
    setRotate(360 * position / period)
    const newDelay = duration * position / period
    setDelay(newDelay)

    if (note) {
      console.log('delay', newDelay * 1000, 'period', period * 1000, 'duration', duration * 1000)
      setTimeout(() => {
        sound()
      }, newDelay * 1000)
      const soundInterval = setInterval(() => {
        setTimeout(() => {
          sound()
        }, newDelay * 1000)
      }, duration * 1000)

      return () => clearInterval(soundInterval)
    }
  }, [duration])
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle-inner']
  if (note) {
    classes.push('ap-music-circle-inner--active')
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
      <div className='ap-music-circle-inner-note'>
      </div>
    </div>
  )
  // #endregion
}
