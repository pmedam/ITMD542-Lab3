const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Contact = require('../src/Contact');
const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const allContacts = JSON.parse(jsonData);
    allContacts.forEach((cnt) => {
        const contact = new Contact(cnt[1].id, cnt[1].firstName, cnt[1].lastName, cnt[1].email, cnt[1].notes);
        db.set(contact.id, contact);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        contact.id = crypto.randomUUID();
        db.set(contact.id, contact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        saveData();
    },

};

loadData();

module.exports = repo;