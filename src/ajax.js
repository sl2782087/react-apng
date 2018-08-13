function getImgBuffer(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      resolve(this.response);
    } else {
      reject(new Error(this));
    }
    // xhr.onload = function () {
    //   if (this.status === 200) {
    //     resolve(this.response);
    //   } else {
    //     reject(this);
    //   }
    // };
    xhr.send();
  });
}
export { getImgBuffer };
