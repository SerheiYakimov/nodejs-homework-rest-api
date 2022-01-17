import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import guard from '../../../midllewares/guard/guard';
import limiter from '../../../midllewares/rate-limit';
import {
    validateSingup,
    validateLogin,
} from '../../../midllewares/validations/usersValidation';

const router = new Router();

router.post('/registration', limiter(15 * 60 * 1000, 2), validateSingup, registration);
router.post('/login', validateLogin, login);
router.post('/logout', guard, logout);


export default router;

