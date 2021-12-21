const { HTTP_CODS } = require('../../helpers/constants')
const { User } = require('../../model/schemas/user')

const subscription = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await User.updateSubscription(id, req.body)
    const { email, subscription } = user
    return res.status(HTTP_CODS.OK).json({
      status: `${HTTP_CODS.OK} success`,
      code: HTTP_CODS.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = subscription
