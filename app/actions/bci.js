import fs from 'fs';

// @flow
import type { bciInitialStateType } from '../reducers/bci';

type actionType = {
  +type: string,
};

export const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
export const CONNECT_FAILED = 'CONNECT_FAILED';
export const GET_BCI_DATA = 'GET_BCI_DATA';

export function connectSuccess() {
  return {
    type: CONNECT_SUCCESSFUL
  };
}

export function connectFail() {
  return {
    type: CONNECT_FAILED
  };
}

export function setBciData(battery, signal, relaxation, stress) {
  return {
    type: GET_BCI_DATA,
    battery,
    signal,
    relaxation,
    stress
  };
}

export function readFile() {
  return function(dispatch) {
    const desiredFile = `${process.cwd()}/README.md`;
    console.log('desired file: ', desiredFile);
    fs.readFile(desiredFile, 'utf8', (err, file) => {
      if (err) {
        dispatch(connectFail())
        console.log('error!!!', err);
      } else {
        console.log('file read', file.slice(0, 100));
        dispatch(connectSuccess())
        dispatch(setBciData(Math.random(), Math.random(), Math.random(), Math.random()));
      }
    });
  };
}

// export function incrementIfOdd() {
//   return (dispatch: (action: actionType) => void, getState: () => bciInitialStateType) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: (action: actionType) => void) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
