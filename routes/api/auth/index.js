import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import guard from '../../../midllewares/guard/guard';
// import {
//     validateCreate,
//     validateUpdate,
//     validateId,
//     validateUpdateFavorite,
//     validateQuery,
// } from '../../../midllewares/validations/contactsValidation';

const router = new Router();



router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', guard, logout);


export default router;

