import React from 'react';

const library = {
  poly1: new Audio("./lib/audio/polysynth1.mp3"),
  poly2: new Audio("./lib/audio/polysynth2.mp3"),
  poly3: new Audio("./lib/audio/polysynth3.mp3"),
  poly4: new Audio("./lib/audio/polysynth4.mp3"),
  poly5: new Audio("./lib/audio/polysynth5.mp3"),
  poly6: new Audio("./lib/audio/polysynth6.mp3"),
  poly7: new Audio("./lib/audio/polysynth7.mp3"),
  poly8: new Audio("./lib/audio/polysynth8.mp3"),
  poly9: new Audio("./lib/audio/polysynth9.mp3"),
  poly10: new Audio("./lib/audio/polysynth10.mp3"),
  poly11: new Audio("./lib/audio/polysynth1.mp3"),
  poly12: new Audio("./lib/audio/polysynth2.mp3"),
  poly13: new Audio("./lib/audio/polysynth3.mp3"),
  poly14: new Audio("./lib/audio/polysynth4.mp3"),
  poly15: new Audio("./lib/audio/polysynth5.mp3"),
  poly16: new Audio("./lib/audio/polysynth6.mp3"),
  bass1: new Audio("./lib/audio/bass1.mp3"),
  bass2: new Audio("./lib/audio/bass2.mp3"),
  bass3: new Audio("./lib/audio/bass3.mp3"),
  bass4: new Audio("./lib/audio/bass4.mp3"),
  bass5: new Audio("./lib/audio/bass5.mp3"),
  bass6: new Audio("./lib/audio/bass6.mp3"),
  bass7: new Audio("./lib/audio/bass7.mp3"),
  bass8: new Audio("./lib/audio/bass8.mp3"),
  bass9: new Audio("./lib/audio/bass9.mp3"),
  bass10: new Audio("./lib/audio/bass10.mp3"),
  bass11: new Audio("./lib/audio/bass11.mp3"),
  bass12: new Audio("./lib/audio/bass12.mp3"),
  bass13: new Audio("./lib/audio/bass13.mp3"),
  bass14: new Audio("./lib/audio/bass14.mp3"),
  bass15: new Audio("./lib/audio/bass15.mp3"),
  bass16: new Audio("./lib/audio/bass16.mp3")
}

export default class Sequence extends React.Component {
  constructor(){
    super();
    this.state = {
      playlist: [[],[],[],[]],
      step: 0,
      play: false
    };

    this.library = library;
    
    this.tick = this.tick.bind(this);
    this.playButtonClick = this.playButtonClick.bind(this);
    this.startInterval = this.startInterval.bind(this);

    this.metronome;
  }

  tick(){
    this.setState({step: (this.state.step +1)%4});
    this.state.playlist[this.state.step].map(queue => {
      queue.obj.play();
    });
  }

  startInterval(){
    this.metronome = setInterval(()=>{
      this.tick();
    }, 1000);
  }

  playButtonClick(){
    if (this.state.play){
      clearInterval(this.metronome);
    } else {
      this.startInterval();
    }

    this.setState({ play: !this.state.play });
  }

  instrumentHandler(audio){
    
    const queue ={
      name: audio,
      obj: this.library[audio]
    }

    let that = this;

    return () => {
      // debugger
      that.state.playlist[that.state.step].push(queue);
      that.setState({playlist: that.state.playlist})
    };
    // console.log(audio);
    // return () => {
    //   audio.play();
    //   // setTimeout(() => {
    //   //   audio.pause();
    //   // }, 1000);
    // };
  }

  getRandomNum(start, end){
    return Math.floor(Math.random()*(end-start+1))+start;
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  render(){
    const instruments = Object.keys(this.library).map(audio => {
      let color = this.rgbToHex(this.getRandomNum(0,255), this.getRandomNum(0,255), this.getRandomNum(0,255))
      let style = {
        "backgroundColor": color
      };

      return (
        <li>
          <button onClick={this.instrumentHandler(audio)} style={style}>{audio}</button>
        </li>
      );
    });

    // debugger

    const steps = this.state.playlist.map((row,idx) => {
      // debugger
      const step = row.map(player => {
        // debugger
        return (
          <div className="queued-audio">
            {player.name}
          </div>
        );
      });

      let setClass = this.state.step === idx ? "audio-track current-step" : "audio-track";

      return (
        <li className={setClass}>
          {step}
        </li>
      );
    });

    let playButtonText = this.state.play ? "Pause" : "Play"

    return (
      <div className="sequence">
        <button className="play" onClick={this.playButtonClick}>{playButtonText}</button>
        <h1>Current Step: {this.state.step}</h1>
        <ul className="instruments">
          {instruments}
        </ul>
        <ul className="steps">
          {steps}
        </ul>
      </div>
    );
  }
}