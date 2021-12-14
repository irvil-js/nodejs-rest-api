const { createHandlerFunc, genSuccessResponse } = require('../helpers/utils')
const { Contact } = require('../model/schemas/contact')

const getAllContacts = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.find({})
  const responseData = contact || 'Contact list is empty'
  return genSuccessResponse(res, responseData)
})

module.exports = getAllContacts
