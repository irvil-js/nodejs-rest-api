const Contact = require('../model/index')

function genSuccessResponse(res, responseData, code = 200, msg) {
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

const getAllContacts = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.listContacts()
  const responseData = contact || 'Contact list is empty'
  return genSuccessResponse(res, responseData)
})

const getContactById = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.getContactById(req.params.contactId)
  if (!contact) {
    return genErrorResponse(res, 404, 'User with this ID was not found!')
  }
  return genSuccessResponse(res, contact)
})

const addContact = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.addContact(req.body)
  if (!contact) {
    return genErrorResponse(res, 400,
      'A user with this name or email already exists!')
  }

  return genSuccessResponse(res, contact, 201)
})

const removeContact = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.removeContact(req.params.contactId)
  if (!contact) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  return genSuccessResponse(res, 'contact deleted')
})

const updateContact = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.updateContact(
    req.params.contactId,
    req.body,
  )
  if (!contact) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  return genSuccessResponse(res, contact, 200,
    'Contact updated successfully')
})

const updateFavorite = createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.updateContact(
    req.params.contactId,
    req.body,
  )
  if (!contact) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  if (!req.body.favorite) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  return genSuccessResponse(res, contact, 200,
    'Contact updated successfully')
})

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
}
