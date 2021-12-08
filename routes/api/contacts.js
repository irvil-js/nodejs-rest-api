const express = require('express')
const router = express.Router()

const Contact = require('../../model/index')
const { contactValidator } = require('./validation')

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

router.get('/', createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.listContacts()
  const responseData = contact || 'Contact list is empty'
  return genSuccessResponse(res, responseData)
}))

router.get('/:contactId', createHandlerFunc(async (req, res, next) => {
  const contact = await Contact.getContactById(req.params.contactId)
  if (!contact) {
    return genErrorResponse(res, 404, 'User with this ID was not found!')
  }
  return genSuccessResponse(res, contact)
}))

router.post('/', contactValidator, createHandlerFunc(async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    return genErrorResponse(res, 400, 'Missing required name field')
  }

  const contact = await Contact.addContact(req.body)
  if (!contact) {
    return genErrorResponse(res, 400,
      'A user with this name or email already exists!')
  }

  return genSuccessResponse(res, contact, 201)
}))

router.delete('/:contactId', createHandlerFunc(async (req, res, next) => {
  if (!await Contact.removeContact(req.params.contactId)) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  return genSuccessResponse(res, 'contact deleted')
}))

router.put('/:contactId', contactValidator, createHandlerFunc(async (req, res, next) => {
  if (!req.body) {
    return genErrorResponse(res, 400, 'Missing fields')
  }

  const contact = await Contact.updateContact(
    req.params.contactId,
    req.body,
  )
  if (!contact) {
    return genErrorResponse(res, 404, 'Not Found')
  }

  return genSuccessResponse(res, contact, 200,
    'Contact updated successfully')
}))

module.exports = router
