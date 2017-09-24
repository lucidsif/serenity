// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

export class HomePage extends Component {
  render() {
    return (<Home bci={this.props.bci} />
    );
  }
}

const mapStateToProps = ({ bci }) => ({ bci });

export default connect(mapStateToProps)(HomePage);
