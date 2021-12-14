const { HTTP_CODS } = require('../helpers/constants')
const { createHandlerFunc, genSuccessResponse, genErrorResponse } = require('../helpers/utils')
const { Contact } = require('../model/schemas/contact')

const updateFavorite = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: req.params.contactId },
    { ...req.body },
    { new: true },
  )
  if (!contact) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'Not Found')
  }

  if (!req.body.favorite) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'Not Found')
  }

  return genSuccessResponse(res, contact, HTTP_CODS.OK,
    'Contact updated successfully')
})

module.exports = updateFavorite
