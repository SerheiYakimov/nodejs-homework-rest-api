import { Router } from 'express';
import {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
} from '../../../controllers/contacts';
import {
    validateCreate,
    validateUpdate,
    validateId,
    validateUpdateFavorite,
    validateQuery,
} from '../../../midllewares/validations/contactsValidation';
import guard from '../../../midllewares/guard/guard';

const router = new Router();

router.get('/', [guard, validateQuery], getContacts);

router.get('/:id', [guard, validateId], getContactById);

router.post('/', [guard, validateCreate], addContact);

router.delete('/:id', [guard, validateId], removeContact);

router.put('/:id', [guard, validateId, validateUpdate], updateContact);

router.patch('/:id/favorite', [guard, validateId, validateUpdate, validateUpdateFavorite], updateContact);

export default router;

