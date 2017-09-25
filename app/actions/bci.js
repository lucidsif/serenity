import fs from 'fs';
import parse from 'csv-parse';

// @flow
import type { bciInitialStateType } from '../reducers/bci';

type actionType = {
  +type: string
};

export const CONNECT_SUCCESSFUL = 'CONNECT_SUCCESSFUL';
export const CONNECT_FAILED = 'CONNECT_FAILED';
export const SET_BCI_DATA = 'SET_BCI_DATA';
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
    type: SET_BCI_DATA,
    relaxation,
    stress
  };
}

export function resetBciData() {
  return {
    type: RESET_BCI_DATA
  };
}

export function checkCsvFileSize() {
  return function (dispatch) {
    const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';
    const stats1 = fs.statSync(csvFile);
    const firstReadBytes = stats1.size;
    setTimeout(() => {
      const stats2 = fs.statSync(csvFile);
      const secondReadBytes = stats2.size;
      console.log('time', secondReadBytes, firstReadBytes);
      if (secondReadBytes > firstReadBytes) {
        dispatch(connectSuccess());
      } else {
        dispatch(connectFail());
        dispatch(resetBciData());
      }
    }, 3000);
  };
}


export function readFile() {
  return function (dispatch) {
    const csvFile = '/Users/Sif/Downloads/community-sdk-3.5.0-WIN-MAC/build/Programs/PerformanceMetricData.csv';
    console.log('in readfile');
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
              console.log('returning undefined');
              dispatch(setBciData(0.0911, 0.0911));
            } else {
              console.log('not undefined');
              dispatch(setBciData(scaledRelaxationLevel, scaledStressLevel));
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

function CSVtoArray(text) {
  const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  const a = [];                     // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
    (m0, m1, m2, m3) => {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ''; // Return empty string.
    });
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('');
  return a;
}
