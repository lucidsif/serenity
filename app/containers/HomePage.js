// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { readFile, checkCsvFileSize } from '../actions/bci';
import { playSong } from '../actions/sound';
import playSound from 'play-sound';

const player = playSound({});

export class HomePage extends Component {

  constructor() {
    super()

    this.playSound = this.playSound.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.props.checkConnection();
      if (this.props.bci.connected) {
        this.props.getBciData();
      }
    }, 1000);
    this.playSound()
    // if connected, get last line of csv
  }

  playSound() {
    const bci = this.props.bci;
    const sound = this.props.sound;
    const relaxSongPath = '/Users/Sif/Downloads/relax.wav';
    const stressSongPath = '/Users/Sif/Downloads/stress.wav';

    console.log('sound:**', sound)
    if (bci.relaxation >= bci.stress) {
      if (sound.soundObj) {
        sound.soundObj.kill();
      }
      console.log('harmony');
      const relaxSong = player.play(relaxSongPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.props.play('relaxation', relaxSong);
    } else if (bci.relaxation < !bci.stress) {
      if (sound.soundObj) {
        sound.soundObj.kill();
      }
      console.log('discord');
      const stressSong = player.play(stressSongPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.props.play('stress', stressSong);
    } else {
      console.log('nothing');
    }
  }

  // incrementSoundPass() {
  //
  // }

  render() {
    // this.playSound()
    return (<Home bci={this.props.bci} />
    );
  }
}

const mapStateToProps = ({ bci, sound }) => ({ bci, sound });

const mapDispatchToProps = (dispatch) => ({
  checkConnection: () => {
    dispatch(checkCsvFileSize());
  },
  getBciData: () => {
    dispatch(readFile());
  },
  play: (soundType, soundObj) => {
    dispatch(playSong(soundType, soundObj));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
