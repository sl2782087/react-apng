'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Frame = exports.APNG = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @property {number} currFrameNumber
 * @property {Frame} currFrame
 * @property {boolean} paused
 * @property {boolean} ended
 */
var APNG = exports.APNG = function () {
    function APNG() {
        _classCallCheck(this, APNG);

        this.width = 0;
        this.height = 0;
        this.numPlays = 0;
        this.playTime = 0;
        this.frames = [];
    }
    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {Frame[]} */


    _createClass(APNG, [{
        key: 'createImages',


        /**
         *
         * @return {Promise.<*>}
         */
        value: function createImages() {
            return Promise.all(this.frames.map(function (f) {
                return f.createImage();
            }));
        }

        /**
         *
         * @param {CanvasRenderingContext2D} context
         * @param {boolean} autoPlay
         * @return {Promise.<Player>}
         */

    }, {
        key: 'getPlayer',
        value: function getPlayer(context) {
            var _this = this;

            var autoPlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return this.createImages().then(function () {
                return new _player2.default(_this, context, autoPlay);
            });
        }
    }]);

    return APNG;
}();

var Frame = exports.Frame = function () {
    function Frame() {
        _classCallCheck(this, Frame);

        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.delay = 0;
        this.disposeOp = 0;
        this.blendOp = 0;
        this.imageData = null;
        this.imageElement = null;
    }
    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {number} */

    /** @type {Blob} */

    /** @type {HTMLImageElement} */


    _createClass(Frame, [{
        key: 'createImage',
        value: function createImage() {
            var _this2 = this;

            if (this.imageElement) {
                return Promise.resolve();
            }
            return new Promise(function (resolve, reject) {
                var url = URL.createObjectURL(_this2.imageData);
                _this2.imageElement = document.createElement('img');
                _this2.imageElement.onload = function () {
                    URL.revokeObjectURL(url);
                    resolve();
                };
                _this2.imageElement.onerror = function () {
                    URL.revokeObjectURL(url);
                    _this2.imageElement = null;
                    reject(new Error("Image creation error"));
                };
                _this2.imageElement.src = url;
            });
        }
    }]);

    return Frame;
}();