// @flow
import type { bciInitialStateType } from '../reducers/bci';

type actionType = {+type: string
};

export const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
export const CONNECT_FAILED = 'CONNECT_FAILED';

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
