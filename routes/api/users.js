const express = require('express')
const router = express.Router()
const { validateAuth, validateUpdateSub } = require('../../helpers/validation')
const upload = require('../../helpers/upload')
const guard = require('../config/guard')

const {
  signup,
  login,
  logout,
  subscription,
  current,
  updateAvatar,
} = require('../../controllers/users/index')

router
  .post('/login', validateAuth, login)
  .post('/signup', validateAuth, signup)
  .patch('/avatars', guard, upload.single('avatar'), updateAvatar)
  .patch('/', guard, validateUpdateSub, subscription)
  .get('/current', guard, current)
  .get('/logout', guard, logout)

module.exports = router
