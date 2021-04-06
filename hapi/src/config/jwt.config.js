module.exports = {
  algorithm: process.env.HAPI_JWT_ALGORITHM,
  secret: process.env.HAPI_JWT_SECRET,
  iss: process.env.HAPI_JWT_ISS
}
