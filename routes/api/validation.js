const Joi = require('joi')
const phoneVal = Joi.extend(require('joi-phone-number'))

const schemaContactFormat = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: phoneVal
    .string()
    .required()
    .phoneNumber({ defaultCountry: 'BE', format: 'international', strict: true }),
})

const validate = (schema, req, next) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    console.log('validation error', error)
    const [{ message }] = error.details
    return next({
      status: 400,
      message,
    })
  }
  req.body = value
  return next()
}

module.exports.contactValidator = (req, res, next) => {
  return validate(schemaContactFormat, req, next)
}
