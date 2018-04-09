(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('apng-js')) :
  typeof define === 'function' && define.amd ? define(['react', 'apng-js'], factory) :
  (global.ApngComponent = factory(global.React,global.parseAPNG));
}(this, (function (React,parseAPNG) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  parseAPNG = parseAPNG && parseAPNG.hasOwnProperty('default') ? parseAPNG['default'] : parseAPNG;

  function getImgBuffer(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(this);
        }
      };
      xhr.send();
    });
  }

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  /**
   * [ApngComponent description]
   * @param {string} className canvas' className
   * @param {object} style canvas' style
   * @param {string} src apng's url
   * @param {number} rate animation's rate
   * @param {function} onClick bind animation's click event
   * @param {bool} autoPlay apng autoplay
   * @extends React
   */

  class ApngComponent extends React.Component {
  	constructor(props) {
  		super(props);

  		_initialiseProps.call(this);

  		const { src = '', rate = 1.0, autoPlay = false } = props;
  		this.state = {
  			src,
  			rate,
  			autoPlay
  		};
  		this.apng = null;
  		this.player = null;
  		this.isOne = false;
  		this.isPlay = false;
  		this.timer = [];
  	}
  	componentDidMount() {
  		this.getImgData();
  	}

  	render() {
  		return React.createElement('canvas', _extends({ ref: 'canvasBox' }, this.props));
  	}
  }

  var _initialiseProps = function () {
  	this.play = () => {
  		this.player.play();
  		this.isPlay = true;
  	};

  	this.pause = () => {
  		this.player.pause();
  		this.resetPlayState();
  	};

  	this.stop = () => {
  		this.player.stop();
  		this.resetPlayState();
  	};

  	this.one = () => {
  		this.resetPlayState();
  		this.timer = [];
  		this.player.stop();
  		const length = this.apng.frames.length || 0;
  		for (let i = 0; i < length - 1; i++) {
  			this.timer[i] = setTimeout(() => {
  				this.player.renderNextFrame();
  				if (i === length - 2) this.player.pause();
  			}, 100 * i);
  		}
  	};

  	this.resetPlayState = () => {
  		this.isPlay = false;
  		if (this.timer.length > 0) {
  			this.timer.forEach(item => clearTimeout(item));
  		}
  	};

  	this.getImgData = async () => {
  		const { canvasBox: canvas } = this.refs;
  		const { rate, src, autoPlay } = this.state;
  		const data = await getImgBuffer(src);
  		this.apng = parseAPNG(data);
  		//错误检测
  		if (this.apng instanceof Error) {
  			// handle error
  			return;
  		}
  		//创建图片canvas
  		await this.apng.createImages();
  		canvas.width = this.apng.width;
  		canvas.height = this.apng.height;
  		//创建canvas播放器
  		const p = await this.apng.getPlayer(canvas.getContext('2d'));
  		this.player = p;
  		this.player.playbackRate = rate;
  		autoPlay && this.player.play();
  	};
  };

  return ApngComponent;

})));
