// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { readFile, checkCsvFileSize } from '../actions/bci';

export class HomePage extends Component {

  componentDidMount() {
    setInterval(() => {
      this.props.checkConnection();
      if (this.props.bci.connected) {
        this.props.getBciData();
      }
    }, 1000);
      // if connected, get last line of csv
  }


  render() {
    return (<Home bci={this.props.bci} />
    );
  }
}

const mapStateToProps = ({ bci }) => ({ bci });

const mapDispatchToProps = (dispatch) => ({
  checkConnection: () => {
    dispatch(checkCsvFileSize());
  },
  getBciData: () => {
    dispatch(readFile());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
