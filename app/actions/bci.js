import fs from 'fs';
import csv from 'csvtojson';

// @flow
import type { bciInitialStateType } from '../reducers/bci';

type actionType = {
  +type: string
};

export const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
export const CONNECT_FAILED = 'CONNECT_FAILED';
export const GET_BCI_DATA = 'GET_BCI_DATA';
export const RESET_BCI_DATA = 'RESET_BCI_DATA';

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

export function setBciData(relaxation, stress) {
  return {
    type: GET_BCI_DATA,
    relaxation,
    stress
  };
}

export function resetBciData() {
  return {
    type: RESET_BCI_DATA
  };
}

export function readFile() {
  return function (dispatch) {
    // const desiredFile = `${process.cwd()}/README.md`;
    const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';
    console.log('csv file: ', csvFile);
    csv()
      .fromFile(csvFile)
      .on('json', (jsonObj) => {
        console.log(jsonObj);
        dispatch(setBciData(Math.random(), Math.random()));
        // combine csv header row and csv line to a json object
        // jsonObj.a ==> 1 or 4
      })
      .on('done', (error) => {
        console.log('end');
        if (error) {
          dispatch(connectFail());
        }
      });
    // fs.readFile(csvFile, 'utf8', (err, file) => {
    //   if (err) {
    //     dispatch(connectFail())
    //     console.log('error!!!', err);
    //   } else {
    //     console.log('file read', file.slice(file.length - 500, file.length - 1));
    //     dispatch(connectSuccess())
    //     // TODO: parse values from csv here
    //     dispatch(setBciData(Math.random(), Math.random(), Math.random(), Math.random()));
    //   }
    // });
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
