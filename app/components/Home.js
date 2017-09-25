// @flow
import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    const bci = this.props.bci;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            bci.connected ? <h3 style={{ color: 'green' }}>Connected</h3> : <h3 style={{ color: 'red' }}>Disconnected</h3>
          }
          {
            bci.connected && bci.weakOrEmulated && (<h4 style={{ color: 'orange' }}> Weak Signal or Emulator</h4>)
          }
          <div>
            Time Running: {bci.time}
          </div>
          <div>
          Relaxation Level: {bci.relaxation}
          </div>
          <div>
          Stress Level: {bci.stress}
          </div>
        </div>
      </div>
    );
  }
}
