import React, { createContext, PropsWithChildren, ReactNode, useReducer } from 'react'

// #region Context
export const AudioProviderContext = createContext<any>({})
export const AudioProviderDispatchContext = createContext<React.Dispatch<any>>(
  () => { }
)
// #endregion

// #region Reducer
function audioReducer(settings: any, action: any) {
  switch (action.type) {
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
const LOAD_AUDIO = 'LOAD_AUDIO'
function loadAudio(url: string, name: string) {
  return {
    type: LOAD_AUDIO,
    url, 
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
export const GameSettingsActions = {
  loadAudio,
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
      context: new AudioContext()
    }
  )
  // #endregion

  // #region > Rendering
  return (
    <AudioProviderContext.Provider value={{}} >
      <AudioProviderDispatchContext.Provider value={dispatch}>
        {children}
      </AudioProviderDispatchContext.Provider>
    </AudioProviderContext.Provider>
  )
  // #endregion
}
// #endregion
