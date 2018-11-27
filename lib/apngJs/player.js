'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_EventEmitter) {
    _inherits(_class, _EventEmitter);

    /**
     * @param {APNG} apng
     * @param {CanvasRenderingContext2D} context
     * @param {boolean} autoPlay
     */

    /** @type {boolean} */

    /** @type {number} */

    /** @type {Frame} */

    /** @type {number} */
    function _class(apng, context, autoPlay) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.playbackRate = 1.0;
        _this._currentFrameNumber = 0;
        _this._ended = false;
        _this._paused = true;
        _this._numPlays = 0;

        _this._apng = apng;
        _this.context = context;
        _this.stop();
        _this.hasPerformance = typeof performance !== 'undefined';
        if (autoPlay) {
            _this.play();
        }
        return _this;
    }

    /**
     *
     * @return {number}
     */

    /** @type {number} */


    /** @type {boolean} */

    /** @type {ImageData} */


    /** @type {APNG} */

    /** @type {CanvasRenderingContext2D} */


    _createClass(_class, [{
        key: 'renderNextFrame',
        value: function renderNextFrame() {
            this._currentFrameNumber = (this._currentFrameNumber + 1) % this._apng.frames.length;
            if (this._currentFrameNumber === this._apng.frames.length - 1) {
                this._numPlays++;
                if (this._apng.numPlays !== 0 && this._numPlays >= this._apng.numPlays) {
                    this.emit('end');
                    this._ended = true;
                    this._paused = true;
                }
            }

            if (this._prevFrame && this._prevFrame.disposeOp == 1) {
                this.context.clearRect(this._prevFrame.left, this._prevFrame.top, this._prevFrame.width, this._prevFrame.height);
            } else if (this._prevFrame && this._prevFrame.disposeOp == 2) {
                this.context.putImageData(this._prevFrameData, this._prevFrame.left, this._prevFrame.top);
            }

            var frame = this.currentFrame;
            this._prevFrame = frame;
            this._prevFrameData = null;
            if (frame.disposeOp == 2) {
                this._prevFrameData = this.context.getImageData(frame.left, frame.top, frame.width, frame.height);
            }
            if (frame.blendOp == 0) {
                this.context.clearRect(frame.left, frame.top, frame.width, frame.height);
            }

            this.context.drawImage(frame.imageElement, frame.left, frame.top);
        }

        // playback

    }, {
        key: 'play',
        value: function play() {
            var _this2 = this;

            this.emit('play');

            if (this._ended) {
                this.stop();
            }
            this._paused = false;
            var performance = this.hasPerformance ? performance || window.performance : Date; // supports ios8 Safari
            var nextRenderTime = performance.now() + this.currentFrame.delay / this.playbackRate;
            var tick = function tick(now) {
                var _now = _this2.hasPerformance ? now : Date.now(); // supports ios8 Safari
                if (_this2._ended || _this2._paused) {
                    return;
                }
                if (_now >= nextRenderTime) {
                    while (_now - nextRenderTime >= _this2._apng.playTime / _this2.playbackRate) {
                        nextRenderTime += _this2._apng.playTime / _this2.playbackRate;
                        _this2._numPlays++;
                    }
                    do {
                        _this2.renderNextFrame();
                        nextRenderTime += _this2.currentFrame.delay / _this2.playbackRate;
                    } while (!_this2._ended && _now > nextRenderTime);
                }
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this._paused) {
                this.emit('pause');
                this._paused = true;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.emit('stop');
            this._numPlays = 0;
            this._ended = false;
            this._paused = true;
            // render first frame
            this._currentFrameNumber = -1;
            this.context.clearRect(0, 0, this._apng.width, this._apng.height);
            this.renderNextFrame();
        }
    }, {
        key: 'currentFrameNumber',
        get: function get() {
            return this._currentFrameNumber;
        }

        /**
         *
         * @return {Frame}
         */

    }, {
        key: 'currentFrame',
        get: function get() {
            return this._apng.frames[this._currentFrameNumber];
        }
    }, {
        key: 'paused',
        get: function get() {
            return this._paused;
        }
    }, {
        key: 'ended',
        get: function get() {
            return this._ended;
        }
    }]);

    return _class;
}(_events2.default);

exports.default = _class;