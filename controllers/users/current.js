const { HTTP_CODS } = require('../../helpers/constants')
const { User } = require('../../model/schemas/user')

const current = async (req, res, next) => {
  try {
    const id = req.user._id
    const user = await User.findById(id)
    const { email, subscription } = user

    return res.status(HTTP_CODS.OK).json({
      status: `${HTTP_CODS.OK} OK`,
      code: HTTP_CODS.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
