import { Router } from 'express';
// import {
//     getContacts,
//     getContactById,
//     addContact,
//     removeContact,
//     updateContact,
// } from '../../../controllers/contacts';
import Contact from '../../../controllers/contacts'
import {
    validateCreate,
    validateUpdate,
    validateId,
    validateUpdateFavorite,
    validateQuery,
} from '../../../midllewares/validations/contactsValidation';
import guard from '../../../midllewares/guard/guard';
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();
const contact = new Contact();

router.get('/', [guard, validateQuery], wrapperError(contact.getContacts));

router.get('/:id', [guard, validateId], wrapperError(contact.getContactById));

router.post('/', [guard, validateCreate], wrapperError(contact.addContact));

router.delete('/:id', [guard, validateId], wrapperError(contact.removeContact));

router.put('/:id', [guard, validateId, validateUpdate], wrapperError(contact.updateContact));

router.patch(
    '/:id/favorite',
    [guard, validateId, validateUpdate, validateUpdateFavorite],
    wrapperError(contact.updateContact));

export default router;

