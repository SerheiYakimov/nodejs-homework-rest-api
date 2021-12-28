import Contact from '../../models/contact';


export const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
}