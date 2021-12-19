import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from './contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 


const listContacts = async () => {
    return contacts;
}

const getContactById = async (contactId) => {
    const [result] = contacts.filter((contact) => contact.id === contactId);
    return result;
}

const removeContact = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  const indexContact = contacts.indexOf(contact);
    if (indexContact !== -1) {
      contacts.splice(indexContact, 1);
      await fs.writeFile(
          path.join(__dirname, 'contacts.json'),
          JSON.stringify(contacts, null, 2)
      );
      return contact;
    }
    return null;
}

const addContact = async ({ name, email, phone }) => {
    const newContact = { name, email, phone, id: randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(
        path.join(__dirname, 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return newContact;
}

const updateContact = async (contactId, body) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  const indexContact = contacts.indexOf(contact);
  if (indexContact !== -1) {
    console.log(indexContact);
      const updatedContact = { id: contact.id, ...contacts[indexContact], ...body }
      contacts[indexContact] = updatedContact;
      await fs.writeFile(
          path.join(__dirname, 'contacts.json'),
          JSON.stringify(contacts, null, 2)
      );
      return updatedContact;
    }
    return null; 
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}


