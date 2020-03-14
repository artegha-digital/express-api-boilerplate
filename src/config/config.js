const config = {
  db: 'mongodb://user:password@ip/db',
  hashSaltRound: 10,
  secret: 'YourSecretKey',
  mail: 'YourPassword',
  tokenExpiration: 60 * 60 * 3 // 3 hours
}
// let env = process.env.NODE_ENV === 'development' ? 'sandbox' : 'prod'
// module.exports = config[env];
module.exports = config
