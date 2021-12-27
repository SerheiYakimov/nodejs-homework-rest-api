import db from '../../db/db';
import {ObjectId} from 'mongodb'

const getCollection = async (db, name) => {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
}

export const getContactById = async (contactId) => {
    const collection = await getCollection(db, 'contacts');
    const id = ObjectId(contactId)
    const [result] = await collection.find({ _id: id}).toArray();
    return result;
}