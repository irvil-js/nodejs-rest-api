const express = require('express')
const router = express.Router()

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require('../../controllers/index')

const { contactValidator } = require('./validation')

router
  .get('/:contactId', getContactById)
  .delete('/:contactId', removeContact)
  .put('/:contactId', contactValidator, updateContact)
  .patch('/:contactId/favorite', updateFavorite)
  .get('/', getAllContacts)
  .post('/', contactValidator, addContact)

module.exports = router
