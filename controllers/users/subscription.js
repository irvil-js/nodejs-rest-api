const { HTTP_CODS } = require('../../helpers/constants')
const { User } = require('../../model/schemas/user')
require('dotenv').config()
const adminEmail = process.env.ADMIN_ACCOUNT_EMAIL 

const subscription = async (req, res, next) => {
  try {
    if (req.user.email !== adminEmail) {
      return res.status(HTTP_CODS.UNAUTHORIZED)
        .json({
          message: 'Use admin account'
        })
    }

    const { email, subscription } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(HTTP_CODS.BAD_REQUEST)
        .json({
          message: 'Wrong email'
        })
    }

    await User.findByIdAndUpdate(
      { _id: user._id },
      { subscription: subscription },
      { new: false },
    )
    return res.status(HTTP_CODS.OK).json({
      status: `${HTTP_CODS.OK} success`,
      code: HTTP_CODS.OK,
      data: {
        user: {
          email: email,
          subscription: subscription,
        },
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = subscription
