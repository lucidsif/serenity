// @flow
import {
    CONNECT_SUCCESSFUL,
    CONNECT_FAILED,
    SET_BCI_DATA,
  RESET_BCI_DATA,
  SET_TO_WEAK_OR_EMULATED,
  UNSET_WEAK_OR_EMULATED
} from '../actions/bci';

export type bciIntialStateType = {
  +connected: boolean,
    +signal: number,
    +battery: number,
    +relaxation: number,
    +stress: number,
  +time: number,
  +weakOrEmulated: boolean
};

type actionType = {
  +type: string
};

const bciInitialState = {
  connected: false,
  signal: 0,
  battery: 0,
  relaxation: 0,
  stress: 0,
  time: 0,
  weakOrEmulated: false
};

export default function bci(state: initialStateType = bciInitialState, action: actionType) {
  switch (action.type) {
    case CONNECT_SUCCESSFUL:
      return { ...state, connected: true };
    case CONNECT_FAILED:
      return { ...state, connected: false };
    case SET_TO_WEAK_OR_EMULATED:
      return { ...state, weakOrEmulated: true};
    case UNSET_WEAK_OR_EMULATED:
      return { ...state, weakOrEmulated: false};
    case SET_BCI_DATA:
      const { relaxation, stress, time } = action;
      return { ...state, relaxation, stress, time };
    case RESET_BCI_DATA:
      return { ...state, signal: 0, battery: 0, relaxation: 0, stress: 0 };
    default:
      return state;
  }
}
