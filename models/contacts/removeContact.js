import db from '../../db/db';
import {ObjectId} from 'mongodb'

const getCollection = async (db, name) => {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
}

export const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id: id});
  return result;
}