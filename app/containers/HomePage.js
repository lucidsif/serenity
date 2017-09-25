// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { readFile, checkCsvFileSize } from '../actions/bci';
import { playSong, stopSong, incrementSoundPass } from '../actions/sound';
import playSound from 'play-sound';

const player = playSound({});

export class HomePage extends Component {

  constructor() {
    super();

    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.props.checkConnection();
      if (this.props.bci.connected) {
        this.props.getBciData();
        this.props.increment();
      }
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bci.stress !== nextProps.bci.stress && this.props.bci.relaxation !== nextProps.bci.relaxation) {
      this.playSound()
    }
  }

  playSound() {
    const bci = this.props.bci;
    const sound = this.props.sound;
    const relaxSongPath = '/Users/Sif/Downloads/relax.wav';
    const stressSongPath = '/Users/Sif/Downloads/stress.wav';
    if (bci.relaxation >= bci.stress && sound.soundType !== 'relaxation') {
      if (sound.soundObj) {
        sound.soundObj.kill();
      }
      const relaxSong = player.play(relaxSongPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.props.play('relaxation', relaxSong);
    } else if (bci.relaxation < bci.stress && sound.soundType !== 'stress') {
      if (sound.soundObj) {
        sound.soundObj.kill();
      }
      const stressSong = player.play(stressSongPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.props.play('stress', stressSong);
    }
      if (sound.passes > 50) {
        console.log('replay');
        if (sound.soundObj) {
          sound.soundObj.kill();
        }
        const currentSongPath = sound.soundType === 'relaxation' ? relaxSongPath : stressSongPath
        const currentSong = player.play(currentSongPath, (err) => {
          if (err) {
            console.log(err);
          }
        });
        this.props.play(sound.soundType, currentSong);
      }
  }

  // incrementSoundPass() {
  //
  // }

  render() {
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
  },
  stop: () => {
    dispatch(stopSong());
  },
  increment: () => {
    dispatch(incrementSoundPass());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
