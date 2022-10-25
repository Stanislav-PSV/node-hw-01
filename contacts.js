const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const readedContacts = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(readedContacts);
  return contacts;
}

async function getContactById(contactId) {
  const contactIdToString = contactId.toString();
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactIdToString);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contactIdToString = contactId.toString();
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(
    ({ id }) => id === contactIdToString
  );
  if (contactIdFromArr === -1) {
    return null;
  }
  const deletedContact = contacts.splice(contactIdFromArr, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}
async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
