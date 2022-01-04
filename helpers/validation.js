const Joi = require('joi')
const phoneVal = Joi.extend(require('joi-phone-number'))
Joi.objectId = require('joi-objectid')(Joi)
const { HTTP_CODS } = require('../helpers/constants')

const schemaContactFormat = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] },
    }),
  favorite: Joi.boolean().default(false),
  subscription: Joi.any().valid('starter', 'pro', 'business'),
  owner: Joi.objectId().required(),
  phone: phoneVal
    .string()
    .required()
    .phoneNumber({ defaultCountry: 'BE', format: 'international', strict: true }),
})

const schemaValidateAuth = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const schemaValidateUpdateSub = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.any().valid('starter', 'pro', 'business').required(),
})

const validate = (schema, req, next) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    console.log('validation error', error)
    const [{ message }] = error.details
    return next({
      status: HTTP_CODS.BAD_REQUEST,
      message: `Failed: ${message.replace(/"/g, '')}`,
    })
  }
  req.body = value
  return next()
}

module.exports.contactValidator = (req, res, next) => {
  return validate(schemaContactFormat, req, next)
}

module.exports.validateAuth = (req, _res, next) => {
  return validate(schemaValidateAuth, req, next)
}

module.exports.validateUpdateSub = (req, _res, next) => {
  return validate(schemaValidateUpdateSub, req, next)
}
