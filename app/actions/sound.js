export const PLAY_SONG = 'PLAY_SONG';
export const STOP_SONG = 'STOP_SONG';
export const INCREMENT_SOUND_PASS = 'INCREMENT_SOUND_PASS';

export function playSong(soundType, soundObj) {
  return {
    type: PLAY_SONG,
    soundType,
    soundObj
  };
}

export function stopSong() {
  return {
    type: STOP_SONG,
  };
}

export function incrementSoundPass() {
  return {
    type: INCREMENT_SOUND_PASS
  };
}
