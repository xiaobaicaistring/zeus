import utils from './utils'
import config from './config'
import Events from './events'

class Zeus extends Events {
  constructor (options) {
    super()
    utils.assign(config, options)
    this.config = config
    this._Zeus = window.Zeus
  }

  noConflict () {
    window.Zeus = this._Zeus
    return this
  }
}
export default Zeus
