// @flow
import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    console.log('bci', this.props.bci)
    const bci = this.props.bci
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            bci.connected ? <h3 style={{color: 'green'}}>Connected</h3> : <h3 style={{color: 'red'}}>Disconnected</h3>
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
