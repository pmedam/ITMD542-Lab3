var express = require('express');
var router = express.Router();
const contactsController = require('../contollers/contactsControllers');
const { body } = require('express-validator');

  
  router.get('/', contactsController.home_page);

/* GET contacts listing. */
router.get('/contacts', contactsController.contacts_list);

/* GET contacts add */
router.get('/contact_add', contactsController.contacts_create_get);

/* POST contacts add */
router.post('/contact_add', body('firstName').trim().notEmpty().withMessage('First name can not be empty!'),body('lastName').trim().notEmpty().withMessage('last name can not be empty!'),
     contactsController.contacts_create_post);

/* GET a contact */
router.get('/contact_view/:id', contactsController.contacts_detail);

/* GET contacts delete */
router.get('/contact_delete/:id', contactsController.contacts_delete_get);

/* POST contacts delete */
router.post('/contact_delete/:id', contactsController.contacts_delete_post);

/* GET contacts edit */
router.get('/contact_edit/:id', contactsController.contacts_edit_get);

/* POST contacts add */
router.post('/contact_edit/:id', contactsController.contacts_edit_post);

module.exports = router;