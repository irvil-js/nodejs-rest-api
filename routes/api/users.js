const express = require('express')
const router = express.Router()

const {
  signup,
  login,
  logout,
  subscription,
  current,
} = require('../../controllers/users/index')

router
  .get('/',login)
  .post('/', signup)

module.exports = router
