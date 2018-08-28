// inspire from https://github.com/JacksonTian/eventproxy
class Events {
  constructor () {
    this._callbacks = {}
    this._fired = {}
  }

  on (ev, callback) {
    this._callbacks[ev] = this._callbacks[ev] || []
    this._callbacks[ev].push(callback)
    return this
  }

  remove (eventname, callback) {
    let calls = this._callbacks
    if (!eventname) {
      this._callbacks = {}
    } else {
      if (!callback) {
        calls[eventname] = []
      } else {
        let list = calls[eventname]
        if (list) {
          let l = list.length
          for (let i = 0; i < l; i++) {
            if (callback === list[i]) {
              list[i] = null
            }
          }
        }
      }
    }
    return this
  }
  emit (eventname, data) {
    let list, callback, i, l
    let calls = this._callbacks
    list = calls[eventname]
    if (list) {
      for (i = 0, l = list.length; i < l; i++) {
        if (!(callback = list[i])) {
          list.splice(i, 1)
          i--
          l--
        } else {
          let args = []
          for (let j = 1; j < arguments.length; j++) {
            args.push(arguments[j])
          }
          callback.apply(this, args)
        }
      }
    }
  };
}
export default Events
