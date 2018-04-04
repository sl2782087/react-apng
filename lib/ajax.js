function getImgBuffer(url) {
  return new Promise(((resolve, reject) => {
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
  }));
}
export { getImgBuffer };
