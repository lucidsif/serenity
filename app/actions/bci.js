import fs from 'fs';
import parse from 'csv-parse';

// @flow
// import type { bciInitialStateType } from '../reducers/bci';

// type actionType = {
//   +type: string
// };

export const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
export const CONNECT_FAILED = 'CONNECT_FAILED';
export const SET_BCI_DATA = 'SET_BCI_DATA';
export const RESET_BCI_DATA = 'RESET_BCI_DATA';
export const SET_TO_WEAK_OR_EMULATED = 'SET_TO_WEAK_OR_EMULATED'
export const UNSET_WEAK_OR_EMULATED = 'UNSET_WEAK_OR_EMULATED'

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

export function setBciData(relaxation, stress, time) {
  return {
    type: SET_BCI_DATA,
    relaxation,
    stress,
    time
  };
}

export function resetBciData() {
  return {
    type: RESET_BCI_DATA
  };
}

export function setToWeakOrEmulated() {
  return {
    type: SET_TO_WEAK_OR_EMULATED
  };
}

export function unsetToWeakOrEmulated() {
  return {
    type: UNSET_WEAK_OR_EMULATED
  };
}

export function checkCsvFileSize() {
  return function (dispatch) {
    const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';

    fs.stat(csvFile, (err1, stats1) => {
      if (err1) {
        console.log(err1);
        dispatch(connectFail());
        dispatch(resetBciData());
      } else {
        const firstReadBytes = stats1.size;
        setTimeout(() => {
          fs.stat(csvFile, (err2, stats2) => {
            if (err2) {
              console.log(err2);
              dispatch(connectFail());
              dispatch(resetBciData());
            } else {
              const secondReadBytes = stats2.size;
              console.log('time', secondReadBytes, firstReadBytes);
              if (secondReadBytes > firstReadBytes) {
                dispatch(connectSuccess());
              } else {
                dispatch(connectFail());
                dispatch(resetBciData());
              }
            }
          });
        }, 1000);
      }
    });
  };
}


export function readFile() {
  return function (dispatch) {
    const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';
    fs.readFile(csvFile, 'utf8', (err, file) => {
      if (err) {
        console.log(err);
        dispatch(connectFail());
      } else {
        parse(file, { auto_parse: true }, (err2, data) => {
          if (err2) {
            console.log(err2);
          } else {
            const row = data[data.length - 1];
            const timeRunning = row[0];
            const userId = row[1];
            const scaledRelaxationLevel = row[13];
            const scaledStressLevel = row[5];
            console.log('time and scores', timeRunning, scaledRelaxationLevel, scaledStressLevel);
            if (scaledRelaxationLevel === 'undefined' || scaledStressLevel === 'undefined') {
              dispatch(setToWeakOrEmulated());
              dispatch(setBciData(Math.random().toFixed(2), Math.random().toFixed(2), timeRunning));
            } else {
              dispatch(unsetToWeakOrEmulated())
              dispatch(setBciData(scaledRelaxationLevel, scaledStressLevel, timeRunning));
            }
          }
        });
      }
    });
    // csv()
    //   .from.stream(fs.createReadStream(csvFile))
    //   .to.array((data, count) => {
    //     console.log('in array', data);
    //     const lastLine = data.slice(-1)[0];
    //     const bciData = lastLine.slice(-1)[0];
    //     console.log('parsed', bciData);
    //     dispatch(setBciData(Math.random(), Math.random()));
    //   });
  };
}


// export function readFile() {
//   return function (dispatch) {
//     // const desiredFile = `${process.cwd()}/README.md`;
//     const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';
//     console.log('csv file: ', csvFile);
//     fs.stat(csvFile, (err, stats) => {
//       console.log(stats);// here we got all information of file in stats variable
//       if (err) {
//         dispatch(connectFail());
//       } else {
//         dispatch(connectSuccess());
//         csv()
//           .fromFile(csvFile)
//           .on('json', (jsonObj) => {
//             console.log(jsonObj);
//             dispatch(connectSuccess());
//             dispatch(setBciData(Math.random(), Math.random()));
//             // combine csv header row and csv line to a json object
//             // jsonObj.a ==> 1 or 4
//           })
//           .on('done', (error) => {
//             console.log('end');
//             if (error) {
//               console.log(error);
//             }
//             dispatch(connectFail());
//             dispatch(resetBciData());
//
//             fs.stat(csvFile, (error2, stats2) => {
//               console.log(stats2);// here we got all information of file in stats variable
//
//               if (error2) {
//                 return console.error(error2);
//               }
//
//               fs.unlink(csvFile, (error3) => {
//                 if (err) return console.log(error3);
//                 console.log('file deleted successfully');
//               });
//             });
//           });
//       }
//     });
//   };
// }

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

