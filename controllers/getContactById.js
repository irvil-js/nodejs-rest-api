const { HTTP_CODS } = require('../helpers/constants')
const { createHandlerFunc, genSuccessResponse, genErrorResponse } = require('../helpers/utils')
const { Contact } = require('../model/schemas/contact')

const getContactById = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.contactId })
  if (!contact) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'User with this ID was not found!')
  }
  return genSuccessResponse(res, contact)
})

module.exports = getContactById
