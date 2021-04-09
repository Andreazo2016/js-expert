const { readFile } = require('fs/promises')

class BaseRepository {

  constructor({ file }) {
    this._file = file
  }

  async find(itemId) {
    this._content = JSON.parse(await readFile(this._file))
    if (!itemId) return this._content

    return this._content.find(({ id }) => id === itemId)
  }
}

module.exports = BaseRepository