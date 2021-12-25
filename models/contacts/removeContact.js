import fs from 'fs/promises';
import path from 'path';
import contacts from '../../db/contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

export const removeContact = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  const indexContact = contacts.indexOf(contact);
    if (indexContact !== -1) {
      contacts.splice(indexContact, 1);
      await fs.writeFile(
          path.join(__dirname, '../', '../', 'db', 'contacts.json'),
          JSON.stringify(contacts, null, 2)
      );
      return contact;
    }
    return null;
}