import Contact from '../../models/contact';

export const getContactById = async (userId, contactId) => {
    const result = await Contact.findOne({
        _id: contactId,
        owner: userId
    }).populate({
        path: 'owner',
        select: 'name email age role'
    });
    return result;
}