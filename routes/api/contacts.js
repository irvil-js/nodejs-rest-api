const express = require('express')
const router = express.Router()
const guard = require('../config/guard')

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require('../../controllers/contacts/index')

const { contactValidator } = require('../../helpers/validation')

router
  .get('/:contactId', guard, getContactById)
  .delete('/:contactId', guard, removeContact)
  .put('/:contactId', contactValidator, guard, updateContact)
  .patch('/:contactId/favorite', guard, updateFavorite)
  .get('/', guard, getAllContacts)
  .post('/', contactValidator, addContact)

module.exports = router
