'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _apngJs = require('apng-js');

var _apngJs2 = _interopRequireDefault(_apngJs);

var _ajax = require('./ajax');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ApngComponent = function (_React$Component) {
	_inherits(ApngComponent, _React$Component);

	function ApngComponent(props) {
		_classCallCheck(this, ApngComponent);

		var _this = _possibleConstructorReturn(this, (ApngComponent.__proto__ || Object.getPrototypeOf(ApngComponent)).call(this, props));

		_initialiseProps.call(_this);

		var _props$src = props.src,
		    src = _props$src === undefined ? '' : _props$src,
		    _props$rate = props.rate,
		    rate = _props$rate === undefined ? 1.0 : _props$rate,
		    _props$autoPlay = props.autoPlay,
		    autoPlay = _props$autoPlay === undefined ? false : _props$autoPlay;

		_this.state = {
			src: src,
			rate: rate,
			autoPlay: autoPlay
		};
		_this.apng = null;
		_this.player = null;
		_this.isOne = false;
		_this.timer = [];
		_this.isPlay = false;
		return _this;
	}

	_createClass(ApngComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getImgData();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('canvas', _extends({ ref: 'canvasBox' }, this.props));
		}
	}]);

	return ApngComponent;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.play = function () {
		if (!_this2.player.paused) return;
		_this2.player.play();
		_this2.isPlay = true;
	};

	this.pause = function () {
		_this2.player.pause();
		_this2.resetPlayState();
		_this2.isPlay = false;
	};

	this.stop = function () {
		_this2.player.stop();
		_this2.resetPlayState();
		_this2.isPlay = false;
	};

	this.one = function () {
		_this2.resetPlayState();
		_this2.timer = [];
		_this2.player.stop();
		var length = _this2.apng.frames.length || 0;
		_this2.isPlay = true;

		var _loop = function _loop(i) {
			_this2.timer[i] = setTimeout(function () {
				_this2.player.renderNextFrame();
				if (i === length - 2) {
					_this2.player.pause();
					_this2.isPlay = false;
				}
			}, 100 * i);
		};

		for (var i = 0; i < length - 1; i++) {
			_loop(i);
		}
	};

	this.resetPlayState = function () {
		if (_this2.timer.length > 0) {
			_this2.timer.forEach(function (item) {
				return clearTimeout(item);
			});
		}
	};

	this.getImgData = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var canvas, _state, rate, src, autoPlay, data, p;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						canvas = _this2.refs.canvasBox;
						_state = _this2.state, rate = _state.rate, src = _state.src, autoPlay = _state.autoPlay;
						_context.next = 4;
						return (0, _ajax.getImgBuffer)(src);

					case 4:
						data = _context.sent;

						_this2.apng = (0, _apngJs2.default)(data);
						//错误检测

						if (!(_this2.apng instanceof Error)) {
							_context.next = 8;
							break;
						}

						return _context.abrupt('return');

					case 8:
						_context.next = 10;
						return _this2.apng.createImages();

					case 10:
						canvas.width = _this2.apng.width;
						canvas.height = _this2.apng.height;
						//创建canvas播放器
						_context.next = 14;
						return _this2.apng.getPlayer(canvas.getContext('2d'));

					case 14:
						p = _context.sent;

						_this2.player = p;
						_this2.player.playbackRate = rate;
						if (autoPlay) {
							_this2.player.play();
							_this2.isPlay = true;
						}
						_this2.player.on('end', function () {
							_this2.isPlay = false;
						});

					case 19:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, _this2);
	}));
};

exports.default = ApngComponent;