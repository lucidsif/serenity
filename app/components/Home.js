// @flow
import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component {
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
          Signal Strength: {bci.signal}
          </div>
          <div>
          Battery Level: {bci.battery}
          </div>
          <div>
          Relaxation Level: {bci.relaxation}
          </div>
          <div>
          Stress Level: {bci.stress}
          </div>
        </div>
        <button onClick={this.props.changeProps}>Change Props</button>
      </div>
    );
  }
}
