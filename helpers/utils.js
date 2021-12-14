const { HTTP_CODS } = require('../helpers/constants')

function genSuccessResponse(res, responseData, code = HTTP_CODS.OK, msg) {
  return res.status(code).json({
    status: 'success',
    code: code,
    data: responseData,
    ...(msg && { message: msg })
  })
}

function genErrorResponse(res, code, msg) {
  return res.status(code).json({
    status: 'error',
    code: code,
    message: msg,
  })
}

function createHandlerFunc(func) {
  return async (req, res, next) => {
    try {
      return func(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = { createHandlerFunc, genSuccessResponse, genErrorResponse }
