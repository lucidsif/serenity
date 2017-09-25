// @flow
import {
    CONNECT_SUCCESSFUL,
    CONNECT_FAILED,
    SET_BCI_DATA,
  RESET_BCI_DATA
} from '../actions/bci';

export type bciIntialStateType = {
  +connected: boolean,
    +signal: number,
    +battery: number,
    +relaxation: number,
    +stress: number,
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
};

export default function bci(state: initialStateType = bciInitialState, action: actionType) {
  switch (action.type) {
    case CONNECT_SUCCESSFUL:
      return { ...state, connected: true };
    case CONNECT_FAILED:
      return { ...state, connected: false };
    case SET_BCI_DATA:
      const { relaxation, stress } = action;
      return { ...state, relaxation, stress };
    case RESET_BCI_DATA:
      return { ...state, signal: 0, battery: 0, relaxation: 0, stress: 0 };
    default:
      return state;
  }
}
