const { HTTP_CODS } = require('../../helpers/constants')
const { createHandlerFunc, genSuccessResponse, genErrorResponse } = require('../../helpers/utils')
const { Contact } = require('../../model/schemas/contact')

const removeContact = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.findOneAndRemove({ _id: req.params.contactId, owner: req.user._id })
  if (!contact) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'Not Found')
  }

  return genSuccessResponse(res, 'contact deleted')
})

module.exports = removeContact
