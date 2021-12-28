import Contact from '../../models/contact';

export const getContactById = async (contactId) => {
    const result = await Contact.findById(contactId);
    return result;
}