import { PLAY_SONG, STOP_SONG, INCREMENT_SOUND_PASS } from '../actions/sound';

type actionType = {
  +type: string
};

const soundInitialState = {
  playing: false,
  soundObj: null,
  passes: 0
};


export default function bci(state: initialStateType = soundInitialState, action: actionType) {
  switch (action.type) {
    case PLAY_SONG:
      return { ...state, playing: true, soundObj: action.soundObj };
    case STOP_SONG:
      return { ...state, playing: false };
    case INCREMENT_SOUND_PASS:
      return { ...state, passes: state.passes + 1 };
    default:
      return state;
  }
}

