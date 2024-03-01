const { validationResult } = require('express-validator');
const contactsRepo = require('../src/contactSQLLite'); 
// const contactsRepo = require('../src/contactsFileRepository');
const Contact = require('../src/Contact');


exports.home_page = async function(req, res, next) {
    res.render('index', { title: "My App!" });
};
  

/* GET contacts listing. */
exports.contacts_list = async function(req, res, next) {
    const data = await contactsRepo.findAll();
    res.render('contacts', { title: "All Contacts!", contacts: data, errors: null });
};
  
  /* GET contacts add */
  exports.contacts_create_get = function(req, res, next) {
    res.render('contact_add', { title: "Add Contact", errors: null });
  };
  
/* POST contacts add */
exports.contacts_create_post = async function(req, res, next) {
    // Trim whitespace from form field values
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const email = req.body.email.trim();
    const notes = req.body.notes.trim();
    
    // Validate form input
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        res.render('contact_add', { title: "Add Contact", errors: results.array() });
    } else {
      // Create a new contact object with trimmed values
      const newContact = new Contact('', firstName, lastName, email, notes);
      await contactsRepo.create(newContact);
      res.redirect('/contacts');
    }
  };
  
  
  /* GET a contact */
  exports.contacts_detail = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.id);
    if (contact) {
        res.render('contact_view', { title: "View Contact", contact: contact, errors: null });
    } else {
      res.redirect('/contacts');
    }
  };
  
  /* GET contacts delete */
  exports.contacts_delete_get = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.id);
    res.render('contact_delete', { title: 'Delete Contact', contact: contact });
  };
  
  /* POST contacts delete */
  exports.contacts_delete_post = async function(req, res, next) {
    await contactsRepo.deleteById(req.params.id);
    res.redirect('/contacts');
  };
  
  /* GET contacts edit */
  exports.contacts_edit_get = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.id);
    res.render('contact_edit', { title: "Edit Contact", contact: contact, errors: null });
  };
  
/* POST contacts edit */
exports.contacts_edit_post = async function(req, res, next) {
    // Trim whitespace from form field values
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const email = req.body.email.trim();
    const notes = req.body.notes.trim();
  
    // if (firstName === '' || lastName === '') {
    //   const contact = contactsRepo.findById(req.params.id);
    //   res.render('contacts_edit', {title: 'Edit contact', msg: 'First name and Last name can not be empty!', contact: contact});
    // } else {
    //   // Create a new contact object with trimmed values
    //   const updatedContact = new Contact(req.params.id, firstName, lastName, email, notes);
    //   await contactsRepo.update(updatedContact);
    //   res.redirect('/contacts');
    // }
  };
  