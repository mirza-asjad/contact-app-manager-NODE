const express = require('express');
const router = express.Router();
const { validToken } = require('../middlewares/tokenValidatorHandler');

const { getAllContacts, createContact, getSingleContact, updateContact, deleteContact } = require('../controllers/contactController');


router.use(validToken)
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').put(updateContact).get(getSingleContact).delete(deleteContact).patch(updateContact);


module.exports = router;