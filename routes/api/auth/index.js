import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import guard from '../../../midllewares/guard/guard';
import limiter from '../../../midllewares/rate-limit';
import {
    validateSingup,
    validateLogin,
} from '../../../midllewares/validations/usersValidation';
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();

router.post('/registration', limiter(15 * 60 * 1000, 2), validateSingup, wrapperError(registration));
router.post('/login', validateLogin, wrapperError(login));
router.post('/logout', guard, wrapperError(logout));


export default router;

