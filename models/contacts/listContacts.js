import db from '../../db/db';

const getCollection = async (db, name) => {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
}

export const listContacts = async () => {
    const collection = await getCollection(db, 'contacts');
    const result = await collection.find().toArray();
    return result;

}