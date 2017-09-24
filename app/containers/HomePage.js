// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { readFile } from '../actions/bci';

export class HomePage extends Component {
  render() {
    return (<Home bci={this.props.bci} changeProps={this.props.changeProps} />
    );
  }
}

const mapStateToProps = ({ bci }) => ({ bci });

const mapDispatchToProps = (dispatch) => ({
  changeProps: () => {
    dispatch(readFile());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
