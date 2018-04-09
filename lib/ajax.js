'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getImgBuffer(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
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
exports.getImgBuffer = getImgBuffer;