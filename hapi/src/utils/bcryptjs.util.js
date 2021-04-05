const bcrypt = require('bcryptjs')
const saltRounds = 10

const hash = async password => {
  return await bcrypt.hash(password, saltRounds)
}

const compare = async (passwordPlainText, secret) => {
  return await bcrypt.compare(passwordPlainText, secret)
}

module.exports = {
  hash,
  compare
}
