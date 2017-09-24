// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import fs from 'fs';

export default class Home extends Component {

  componentDidMount() {
    const desiredFile = process.cwd() + '/README.md';
    console.log('desired file: ', desiredFile)
    fs.readFile(desiredFile, 'utf8', (err, file) => {
      if (err) {
        console.log('error!!!', err);
      } else {
        console.log('file read', file.slice(0, 100));
      }
    });
  }

  render() {
    console.log('bci', this.props.bci);
    const bci = this.props.bci;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            bci.connected ? <h3 style={{ color: 'green' }}>Connected</h3> : <h3 style={{ color: 'red' }}>Disconnected</h3>
          }
          <div>
          Signal Strength: 0
          </div>
          <div>
          Battery Level: 0
          </div>
          <div>
          Relaxation Level: 0
          </div>
          <div>
          Stress Level: 0
          </div>
        </div>
      </div>
    );
  }
}
