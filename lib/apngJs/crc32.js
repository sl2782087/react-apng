"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (bytes) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bytes.length - start;

  var crc = -1;
  for (var _i = start, l = start + length; _i < l; _i++) {
    crc = crc >>> 8 ^ table[(crc ^ bytes[_i]) & 0xFF];
  }
  return crc ^ -1;
};

var table = new Uint32Array(256);

for (var i = 0; i < 256; i++) {
  var c = i;
  for (var k = 0; k < 8; k++) {
    c = (c & 1) !== 0 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
  }
  table[i] = c;
}

/**
 *
 * @param {Uint8Array} bytes
 * @param {number} start
 * @param {number} length
 * @return {number}
 */
;