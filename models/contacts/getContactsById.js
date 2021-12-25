import contacts from '../../db/contacts.json';


export const getContactById = async (contactId) => {
    const [result] = contacts.filter((contact) => contact.id === contactId);
    return result;
}