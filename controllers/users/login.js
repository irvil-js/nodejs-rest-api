const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { HTTP_CODS, SECRET_KEY } = require('../../helpers/constants')

const { User } = require('../../model/schemas/user')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(HTTP_CODS.UNAUTHORIZED)
      .json({
        message: 'Wrong email or password'
      })
  }
  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) {
    return res.status(HTTP_CODS.UNAUTHORIZED)
      .json({
        message: 'Unauthorized'
      })
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(
    { _id: user._id },
    { token: token },
    { new: false },
  )

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

module.exports = login
