import React from 'react';
import parseAPNG from 'apng-js';
import { getImgBuffer } from './ajax';

/**
 * [ApngComponent description]
 * @param {string} className canvas' className
 * @param {string} src apng's url
 * @param {number} rate animation's rate
 * @param {function} onClick bind animation's click event
 * @param {bool} autoPlay apng autoplay
 * @extends React
 */

class ApngComponent extends React.Component {
	constructor(props) {
		super(props);
		const { src = '', rate = 1.0, autoPlay = false } = props;
		this.state = {
			src,
			rate,
			autoPlay,
		};
		this.apng = null;
		this.player = null;
		this.isPause = false;
	}
	componentDidMount() {
		this.getImgData();
	}
	play = () => {
		this.player.play();
	};
	pause = () => {
		this.player.pause();
	};
	stop = () => {
		this.player.stop();
	};
	one = () => {
		const length = this.apng.frames.length || 0;
		for (let i = 0; i < length - 1; i++) {
			setTimeout(() => {
				this.player.renderNextFrame();
			}, 100 * i);
		}
	};
	getImgData = async () => {
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
	render() {
		return <canvas ref="canvasBox" {...this.props} />;
	}
}

export default ApngComponent;
