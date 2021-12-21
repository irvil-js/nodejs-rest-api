const { User } = require('../../model/schemas/user')
const HTTP_CODS = require('../../helpers/constants')

const logout = async (req, res) => {
  await User.findById(req.user._id, { token: null })
  res.status(HTTP_CODS.OK)
    .json({
      status: 'success',
      message: 'Success logout'
    })
}

module.exports = logout
