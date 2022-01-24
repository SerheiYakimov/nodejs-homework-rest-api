import Contact from '../../models/contact';


export const listContacts = async ( userId, {
    sortBy,
    sortByDesc,
    filter,
    limit = 10,
    skip = 0,
    favorite,
}) => {
    let sortCriteria = null;
    let total = await Contact.find({ owner: userId}).countDocuments();
    let result = Contact.find({ owner: userId }).populate({
        path: 'owner',
        select: 'name email age role'
    });
    if (sortBy) {
        sortCriteria = { [`${sortBy}`]: 1}
    }
    if (sortByDesc) {
        sortCriteria = { [`${sortByDesc}`]: -1}
    }
    if (filter) {
        result = result.select(filter.split('|').join(' '))
    }
    if (favorite) {
        total = await Contact.find({ favorite: true, owner: userId}).countDocuments();
        result = Contact.find({ favorite: true, owner: userId }).populate({
        path: 'owner',
        select: 'name email age role'
    });
    }
    result = await result
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sortCriteria);
    return {total, contacts: result};

}