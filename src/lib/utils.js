const utils = {
  assign (target, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key]
      }
    }
  }
}
export default utils
