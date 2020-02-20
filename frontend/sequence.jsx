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
  poly16: new Audio("./lib/audio/polysynth6.mp3")
}

export default class Sequence extends React.Component {
  constructor(){
    super();
    // this.state = {
    //   library: library
    // };

    this.library = library;
  }

  clickHandler(audio){
    console.log(audio);
    return () => {
      audio.play();
      // setTimeout(() => {
      //   audio.pause();
      // }, 1000);
    };
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
    const clip = Object.keys(this.library).map(audio => {
      let color = this.rgbToHex(this.getRandomNum(0,255), this.getRandomNum(0,255), this.getRandomNum(0,255))
      let style = {
        "backgroundColor": color
      };

      return (
        <li>
          <button onClick={this.clickHandler(this.library[audio])} style={style}>{audio}</button>
        </li>
      );
    });

    return (
      <div className="sequence">
        <ul>
          {clip}
        </ul>
      </div>
    );
  }
}