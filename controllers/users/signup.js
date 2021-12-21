const { HTTP_CODS } = require('../../helpers/constants')

const { User } = require('../../model/schemas/user')

const signup = async(req, res, next) => {
  try {
    const user = await User.findOne( { "email" : req.body.email} )

    if (user) {
      return res.status(HTTP_CODS.CONFLICT).json({
        status: `${HTTP_CODS.CONFLICT} Conflict`,
        code: HTTP_CODS.CONFLICT,
        message: 'Email in use',
      })
    }

    const { id, email, subscription } = await User.create(req.body)

    return res.status(HTTP_CODS.CREATED).json({
      status: 'success',
      code: HTTP_CODS.CREATED,
      data: { user: { id, email, subscription } },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = signup
