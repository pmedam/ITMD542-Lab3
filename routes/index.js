var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const contactsRepo = require('../src/contactFileRepo');
const Contact = require('../src/Contact');

/* GET todos listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "My App!" });
});

/*GET contacts listing. */
router.get('/contacts', function (req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: "All Contacts!", contacts: data, errors: null });
});

/*Get new contact*/
router.get('/contact_add', function (req, res, next) {
  res.render('contact_add', { title: "Add Contact", errors: null });
})

/* Post new contact. */
router.post('/contact_add',
  body('firstName', 'First Name must not be empty.').notEmpty(),
  body('lastName', 'Last Name must not be empty.').notEmpty(),
  body('email', 'Email must not be empty.').notEmpty(),
  function (req, res, next) {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      res.render('contact_add', { title: "Add Contact", errors: results.array() });
    }
    else {
      contactsRepo.create(new Contact('', req.body.firstName.trim(), req.body.lastName.trim(), req.body.email, req.body.notes));
      res.redirect('/contacts');
    }
  });

/*Get view contact*/
router.get('/contact_view/:id', function (req, res, next) {
  const cId = req.params.id;
  const contact = contactsRepo.findById(cId);
  res.render('contact_view', { title: "View Contact", contact: contact, errors: null });
})

/*Post view contact*/
router.post('/contact_view/:id/', function (req, res, next) {
  const cId = req.params.id;


})

/*Get new contact*/
router.get('/contact_edit/:id', function (req, res, next) {
  const cId = req.params.id;
  const contact = contactsRepo.findById(cId);
  res.render('contact_edit', { title: "Edit Contact", contact: contact, errors: null });
})

/*Post edit Contact form*/
router.post('/contact_edit/:id', function (req, res, next) {
  const result = validationResult(req);
  const cId = req.params.id;

  if (!result.isEmpty()) {
    res.render(`contact_edit/${cId}`, { title: "Edit Contact", errors: result.array() });
  }
  else {
    contactsRepo.update(new Contact(cId, req.body.firstName.trim(), req.body.lastName.trim(), req.body.email, req.body.notes));
    res.redirect('/contacts');
  }
});


/* GET contact delete form. */
router.get('/contact_delete/:id', function (req, res, next) {
  const cId = req.params.id;
  const contact = contactsRepo.findById(cId);
  res.render('contact_delete', { title: 'Delete Contact', contact: contact });
});


/* POST contact delete. */
router.post('/contact_delete/:id', function (req, res, next) {
  contactsRepo.deleteById(req.params.id);
  res.redirect('/contacts');
}
);

module.exports = router;
