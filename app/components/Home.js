// @flow
import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Disconnected</h2>
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
