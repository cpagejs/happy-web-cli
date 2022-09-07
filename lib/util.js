const path = require('path');

function _path(p) {
  return path.resolve(process.cwd(), p);
}

module.exports = {
  _path,
};