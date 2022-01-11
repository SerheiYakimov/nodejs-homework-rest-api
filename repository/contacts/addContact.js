import Contact from '../../models/contact';

export const addContact = async (userId, body) => {
    const result = await Contact.create({...body, owner: userId });
    return result;
}