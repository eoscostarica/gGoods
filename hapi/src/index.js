const Boom = require('@hapi/boom')
const Path = require('path')
const Hapi = require('@hapi/hapi')

const { serverConfig, i18nConfig } = require('./config')
const { jwtUtils } = require('./utils')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: serverConfig.port,
    host: serverConfig.host,
    routes: {
      cors: { origin: ['*'] },
      validate: {
        failAction: async (request, h, err) => {
          if (process.env.NODE_ENV === 'production') {
            throw Boom.badRequest(`Invalid request payload input`)
          } else {
            throw err
          }
        }
      },
      files: {
        relativeTo: Path.join(__dirname, 'files')
      }
    },
    debug: { request: ['handler'] }
  })
  console.log('pasa aqui:')
  server.bind({
    i18n: i18nConfig
  })
  console.log('sigue aqui:')
  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: true,
        logEvents: ['request-error']
      }
    },
    {
      plugin: require('@hapi/inert'),
      options: {}
    },
    {
      plugin: require('hapi-auth-jwt2'),
      options: {}
    }
  ])
  console.log('todo bien aqui:')
  jwtUtils.auth(server)
  console.log('igual aqui:')
  server.route(routes)
  await server.start()
  console.log(`🚀 Server ready at ${server.info.uri}`)
  server.table().forEach(route => console.log(`${route.method}\t${route.path}`))
}

process.on('uncaughtException', (err, origin) => {
  console.log('Uncaught Exception:', err, 'Exception origin:', origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection:', promise, 'reason:', reason)
})

init()
