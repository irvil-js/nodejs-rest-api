const { HTTP_CODS } = require('../../helpers/constants')
const { createHandlerFunc, genSuccessResponse, genErrorResponse } = require('../../helpers/utils')
const { Contact } = require('../../model/schemas/contact')

const addContact = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.create(req.body)
  if (!contact) {
    return genErrorResponse(res, HTTP_CODS.BAD_REQUEST,
      'A user with this name or email already exists!')
  }

  return genSuccessResponse(res, contact, HTTP_CODS.CREATED)
})

module.exports = addContact
