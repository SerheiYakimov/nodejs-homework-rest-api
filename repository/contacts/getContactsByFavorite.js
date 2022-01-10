// import Contact from '../../models/contact';


// export const getContactsByFavorite = async ( userId, favorite, filter) => {
//     // let sortCriteria = null;
//     const total = await Contact.find({owner: userId}).countDocuments();
//     let result = Contact.find({ owner: userId }).populate({
//         path: 'owner',
//         select: 'name email age role'
//     });
//     if (favorite) {
//         result = result.select(filter.split('|').join(' '))
//     }
//     // if (sortByDesc) {
//     //     sortCriteria = { [`${sortByDesc}`]: -1}
//     // }
//     // if (filter) {
//     //     result = result.select(filter.split('|').join(' '))
//     // }
//     // result = await result
//         // .skip(Number(skip))
//         // .limit(Number(limit))
//         // .sort(sortCriteria);
//     return {total, contacts: result};

// }