import React, { createContext, PropsWithChildren, ReactNode, useReducer } from 'react'

// #region Context
interface AudioProviderContextType {
  context: AudioContext
  data: Record<string, any>
}
interface AudioEntryType {
  buffer: AudioBuffer
}
const DEFAULT = {
  context: new AudioContext(),
  data: {}
}
export const AudioProviderContext = createContext<AudioProviderContextType>(DEFAULT)
export const AudioProviderDispatchContext = createContext<React.Dispatch<any>>(
  () => { }
)
// #endregion

// #region Reducer
function audioReducer(context: AudioProviderContextType, action: any) {
  switch (action.type) {
    case LOAD_AUDIO_REQUEST: {
      if (context.data[action.name]) {
        return context
      }
      const result = {
        ...context,
        data: {
          ...context.data,
          [action.name]: {
            buffer: null
          }
        }
      }
      return result
    }
    case LOAD_AUDIO_SUCCESS: {
      const result = {
        ...context,
        data: {
          ...context.data,
          [action.name]: {
            buffer: action.buffer
          }
        }
      }
      return result
    }
    case PLAY_AUDIO: {
      if (!context) {
        console.warn('Context Lost')
        return context
      }
      if (!context.data[action.name]) {
        console.warn('Audio not defined: ' + action.name)
        return context
      }
      if (!context.data[action.name].buffer) {
        console.warn('Audio not loaded: ' + action.name)
        return context
      }

      const sampleSource = context.context.createBufferSource()
      sampleSource.buffer = context.data[action.name].buffer
      sampleSource.connect(context.context.destination);
      sampleSource.start();
      return context
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
const LOAD_AUDIO_REQUEST = 'LOAD_AUDIO_REQUEST'
function loadAudio(url: string, name: string) {
  return {
    type: LOAD_AUDIO_REQUEST,
    url,
    name
  }
}
const LOAD_AUDIO_SUCCESS = 'LOAD_AUDIO_SUCCESS'
function loadAudioSuccess(name: string, buffer: AudioBuffer) {
  return {
    type: LOAD_AUDIO_SUCCESS,
    buffer,
    name
  }
}
const PLAY_AUDIO = 'PLAY_AUDIO'
function playAudio(name: string) {
  return {
    type: PLAY_AUDIO,
    name
  }
}
export const AudioProviderActions = {
  loadAudio,
  loadAudioSuccess,
  playAudio
}

// #endregion

// #region Provider
export const AudioProvider = ({
  children
}: PropsWithChildren) => {

  // #region > Hooks
  const [audio, dispatch] = useReducer(
    audioReducer,
    {
      context: new AudioContext(),
      data: {}
    }
  )
  // #endregion

  // #region > Rendering
  return (
    <AudioProviderContext.Provider value={DEFAULT} >
      <AudioProviderDispatchContext.Provider value={dispatch}>
        {children}
      </AudioProviderDispatchContext.Provider>
    </AudioProviderContext.Provider>
  )
  // #endregion
}
// #endregion
