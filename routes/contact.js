var express = require('express');
var router = express.Router();
const contactsController = require('../contollers/contactsControllers');
const { body } = require('express-validator');


router.get('/', contactsController.home_page);

/* GET contacts listing. */
router.get('/contacts', contactsController.contactsList);

/* GET contacts add */
router.get('/contact_add', contactsController.contactsCreateGet);

/* POST contacts add */
router.post('/contact_add', body('firstName').trim().notEmpty().withMessage('First name can not be empty!'), body('lastName').trim().notEmpty().withMessage('last name can not be empty!'),
    contactsController.contactsCreatePost);

/* GET contacts edit */
router.get('/contact_edit/:id', contactsController.contactsEditGet);

/* POST contacts edit */
router.post('/contact_edit/:id', contactsController.contactsEditPost);

/* GET a contact */
router.get('/contact_view/:id', contactsController.contactsDetail);

/* GET contacts delete */
router.get('/contact_delete/:id', contactsController.contactsDeleteGet);

/* POST contacts delete */
router.post('/contact_delete/:id', contactsController.contactsDeletePost);

module.exports = router;