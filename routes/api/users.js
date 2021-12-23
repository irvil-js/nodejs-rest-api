const express = require('express')
const router = express.Router()
const { validateAuth, validateUpdateSub } = require('../../helpers/validation')
const guard = require('../config/guard')

const {
  signup,
  login,
  logout,
  subscription,
  current,
} = require('../../controllers/users/index')

router
  .post('/login', validateAuth, login)
  .post('/', validateAuth, signup)
  .post('/', guard, logout)
  .patch('', guard, validateUpdateSub, subscription)
  .get('/current', guard, current)

module.exports = router