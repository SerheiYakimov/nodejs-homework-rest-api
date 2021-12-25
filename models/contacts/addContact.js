import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from '../../db/contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

export const addContact = async ({ name, email, phone }) => {
    const newContact = { name, email, phone, id: randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(
        path.join(__dirname, '../', '../', 'db', 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return newContact;
}