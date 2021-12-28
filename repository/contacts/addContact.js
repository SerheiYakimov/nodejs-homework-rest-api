import Contact from '../../models/contact';

export const addContact = async (body) => {
    const result = await Contact.create(body);
    return result;
}