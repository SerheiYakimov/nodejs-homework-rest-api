import express from 'express';
import modelsContacts from '../../../../models/contacts';
import {
    validateCreate,
    validateUpdate,
    validateId
} from '../../midllewares/validations/contactsValidation';
const router = express.Router();

console.log(modelsContacts);


router.get('/', async (req, res, next) => {
  const contacts = await modelsContacts.listContacts();
  res.status(200).json(contacts);
})

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params; 
  const contact = await modelsContacts.getContactById(id);
  if (contact) {
     return res.status(200).json(contact);
  }
  res.status(404).json({ message: 'Not found' })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await modelsContacts.addContact(req.body);
  res.status(201).json(newContact);
})

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params; 
  const contact = await modelsContacts.removeContact(id);
  if (contact) {
     return res.status(200).json({ message: 'Contact deleted' });
  }
  res.status(404).json({ message: 'Not found' })
})

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params; 
  const contact = await modelsContacts.updateContact(id, req.body);
  if (contact) {
     return res.status(200).json(contact);
  }
  res.status(404).json({ message: 'Not found' })
})

export default router;
