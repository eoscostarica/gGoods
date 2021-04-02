const bcrypt = require('bcryptjs')
const saltRounds = 10

const hash = async password => {
  return await bcrypt.hash(password, saltRounds)
}

module.exports = {
  hash
}
