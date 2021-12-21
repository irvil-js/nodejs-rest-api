const passport = require('passport')
require('../config/passport')
const { HTTP_CODS } = require('./constans')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const [, token] = req.get('Authorization').split(' ')
    if (!user || error || token !== user.token) {
      return res.status(HTTP_CODS.FORBIDDEN).json({
        status: 'error',
        code: HTTP_CODS.FORBIDDEN,
        data: 'Forbidden',
        message: 'Access is denied',
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = guard
