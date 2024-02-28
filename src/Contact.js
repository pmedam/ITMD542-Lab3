class Contact{
    constructor(id, firstName, lastName, email="", notes="") {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.notes = notes;
      this.date = new Date().toLocaleString();
    }
  }
  
  module.exports = Contact;