const { HTTP_CODS } = require('../../helpers/constants')
const { createHandlerFunc, genSuccessResponse, genErrorResponse } = require('../../helpers/utils')
const { Contact } = require('../../model/schemas/contact')

const updateFavorite = createHandlerFunc(async (req, res, next) => {
  if (!req.body.favorite) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'Not Found')
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.contactId, owner: req.user._id },
    { ...req.body },
    { new: true },
  )
  if (!contact) {
    return genErrorResponse(res, HTTP_CODS.NOT_FOUND, 'Not Found')
  }

  return genSuccessResponse(res, contact, HTTP_CODS.OK,
    'Contact updated successfully')
})

module.exports = updateFavorite
