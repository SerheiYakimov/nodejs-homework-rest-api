import db from '../../db/db';

const getCollection = async (db, name) => {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
}

export const addContact = async (body) => {
    const collection = await getCollection(db, 'contacts');
    const newContact = {
        favorite: false,
        ...body,
    }
    const result = await collection.insertOne(newContact);
    return result;
}