import Contact from '../../models/contact';


export const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
  return result;
}