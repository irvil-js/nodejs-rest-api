const { HTTP_CODS } = require('../../helpers/constants')

const { User } = require('../../model/schemas/user')

const signup = async(req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(HTTP_CODS.CONFLICT).json({
        status: `${HTTP_CODS.CONFLICT} Conflict`,
        code: HTTP_CODS.CONFLICT,
        message: 'Email in use',
      })
    }

    user = await User.create(req.body)

    return res.status(HTTP_CODS.CREATED).json({
      status: 'success',
      code: HTTP_CODS.CREATED,
      data: { email: user.email, subscription: user.subscription },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = signup
