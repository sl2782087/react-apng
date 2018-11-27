import React from 'react';
import parseAPNG from './apngJs/parser';
import { getImgBuffer } from './ajax';

/**
 * [ApngComponent description]
 * @param {string} className canvas' className
 * @param {object} style canvas' style
 * @param {string} src apng's path
 * @param {number} rate apng play rate
 * @param {function} onClick bind animation's click event
 * @param {bool} autoPlay auto play apng
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
            staticImg: null
        };
        this.apng = null;
        this.player = null;
        this.isOne = false;
        this.timer = [];
        this.isPlay = false;
        this.hasPerformance = typeof performance !== 'undefined';
    }
    componentDidMount() {
        this.getImgData();
    }
    reset = nextProps => {
        const { src = '', rate = 1.0, autoPlay = false } = nextProps;
        this.stop();
        this.apng = null;
        this.player = null;
        this.isOne = false;
        this.timer = [];
        this.isPlay = false;
        this.setState(
            {
                src,
                rate,
                autoPlay,
                staticImg: null
            },
            () => {
                this.getImgData();
            }
        );
    };
    play = () => {
        if (!this.player) return;
        if (!this.player.paused) return;
        this.player.play();
        this.isPlay = true;
    };
    pause = () => {
        if (!this.player) return;
        this.player.pause();
        this.resetPlayState();
        this.isPlay = false;
    };
    stop = () => {
        if (!this.player) return;
        this.player.stop();
        this.resetPlayState();
        this.isPlay = false;
    };
    one = () => {
        if (!this.player) return;
        this.resetPlayState();
        this.player.stop();
        const length = this.apng.frames.length || 0;
        this.isPlay = true;
        let performance = this.hasPerformance ? performance || window.performance : Date;  // supports ios8 Safari
        let nextRenderTime = performance.now() + 40; //1000/24 每秒24帧
        let i = 0;
        const tick = now => {
            const _now = this.hasPerformance? now : Date.now(); // supports ios8 Safari
            if (!this.isPlay || i > length - 2) {
                this.isPlay = false;
                return;
            }
            if (_now >= nextRenderTime) {
                this.player.renderNextFrame();
                i++;
                nextRenderTime = performance.now() + 40;
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    resetPlayState = () => {
        if (this.timer.length > 0) {
            this.timer.forEach(item => clearTimeout(item));
            this.timer = [];
        }
    };
    getImgData = async () => {
        const { canvasBox: canvas } = this.refs;
        const { rate, src, autoPlay } = this.state;
        const data = await getImgBuffer(src);
        this.apng = parseAPNG(data);
        //错误检测
        if (typeof this.apng.width === 'number') {
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
            if (autoPlay) {
                this.player.play();
                this.isPlay = true;
            }
            this.player.on('end', () => {
                this.isPlay = false;
            });
        } else {
            this.setState({
                staticImg: src
            });
        }
    };
    componentWillReceiveProps(nextProps) {
        if (this.state.src !== nextProps.src) {
            this.reset(nextProps);
        }
    }
    componentWillUnmount() {
        if (this.player) {
            this.player.stop();
            this.player._apng = null;
        }
    }
    render() {
        const { staticImg } = this.state;
        return staticImg ? (
            <img src={staticImg} {...this.props} alt="静态图片" />
        ) : (
            <canvas ref="canvasBox" {...this.props} />
        );
    }
}

export default ApngComponent;
