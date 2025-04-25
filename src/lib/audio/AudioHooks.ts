import { AudioProviderActions } from "./AudioProvider"

async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export const useLoadAudio = (context, dispatch, url: string, name: string) => {
  dispatch(AudioProviderActions.loadAudio(url, name))
  getFile(context.context, url)
    .then((buffer) => {
      dispatch(AudioProviderActions.loadAudioSuccess(name, buffer))
    })
}