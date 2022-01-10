import { Router } from 'express';
import {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    // getContactByFavorite,
} from '../../../controllers/contacts';
import {
    validateCreate,
    validateUpdate,
    validateId,
    validateUpdateFavorite,
    validateQuery,
    // validateFavorite,
} from '../../../midllewares/validations/contactsValidation';
import guard from '../../../midllewares/guard/guard';

const router = new Router();

router.get('/', [guard, validateQuery], getContacts);

router.get('/:id', [guard, validateId], getContactById);

// router.get('/favorite', [guard, validateQuery], getContactByFavorite);

router.post('/', [guard, validateCreate], addContact);

router.delete('/:id', [guard, validateId], removeContact);

router.put('/:id', [guard, validateId, validateUpdate], updateContact);

router.patch('/:id/favorite', [guard, validateId, validateUpdate, validateUpdateFavorite], updateContact);

export default router;

