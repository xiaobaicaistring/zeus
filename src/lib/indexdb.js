// inspire from https://github.com/BetterJS/badjs-report/blob/master/src/bj-report.js
class IndexDB {
  constructor () {
    this.db = null
    this._config = ''
  }

  ready (callback) {
    var self = this
    if (!window.indexedDB || !this._config.offlineLog) {
      this._config.offlineLog = false
      return callback()
    }

    if (this.db) {
      setTimeout(function () {
        callback(null, self)
      }, 0)

      return
    }
    var version = 1
    var request = window.indexedDB.open('zeusjs', version)

    if (!request) {
      this._config.offlineLog = false
      return callback()
    }

    request.onerror = function (e) {
      callback(e)
      this._config.offlineLog = false
      console.log('indexdb request error')
      return true
    }
    request.onsuccess = function (e) {
      self.db = e.target.result

      setTimeout(function () {
        callback(null, self)
      }, 500)
    }
    request.onupgradeneeded = function (e) {
      var db = e.target.result
      if (!db.objectStoreNames.contains('logs')) {
        db.createObjectStore('logs', { autoIncrement: true })
      }
    }
  }

  insertToDB (log) {
    var store = this.getStore()
    store.add(log)
  }

  addLog (log) {
    if (!this.db) {
      return
    }
    this.insertToDB(log)
  }

  addLogs (logs) {
    if (!this.db) {
      return
    }

    for (var i = 0; i < logs.length; i++) {
      this.addLog(logs[i])
    }
  }

  getLogs (opt, callback) {
    if (!this.db) {
      return
    }
    var store = this.getStore()
    var request = store.openCursor()
    var result = []
    request.onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        if (cursor.value.time >= opt.start && cursor.value.time <= opt.end && cursor.value.id == opt.id && cursor.value.uin == opt.uin) {
          result.push(cursor.value)
        }
        // # cursor.continue
        cursor['continue']()
      } else {
        callback(null, result)
      }
    }

    request.onerror = function (e) {
      callback(e)
      return true
    }
  }
  clearDB (daysToMaintain) {
    if (!this.db) {
      return
    }

    var store = this.getStore()
    if (!daysToMaintain) {
      store.clear()
      return
    }
    var range = (Date.now() - (daysToMaintain || 2) * 24 * 3600 * 1000)
    var request = store.openCursor()
    request.onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor && (cursor.value.time < range || !cursor.value.time)) {
        store['delete'](cursor.primaryKey)
        cursor['continue']()
      }
    }
  }

  getStore () {
    var transaction = this.db.transaction('logs', 'readwrite')
    return transaction.objectStore('logs')
  }
}
