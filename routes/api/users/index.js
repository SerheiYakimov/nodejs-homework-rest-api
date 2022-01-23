import { Router } from 'express';
import { currentUser, repeatEmailForVerifyUser, uploadAvatar, verifyUser } from '../../../controllers/users';
import guard from '../../../midllewares/guard/guard';
import { upload } from '../../../midllewares/upload';
import { validateEmail } from '../../../midllewares/validations/usersValidation';
import wrapperError from '../../../midllewares/error-handler';

const router = new Router();

router.get('/current', guard, wrapperError(currentUser));
router.patch('/avatar', guard, upload.single('avatar'), wrapperError(uploadAvatar));
router.get('/verify/:verifyToken', wrapperError(verifyUser));
router.post('/verify', validateEmail, wrapperError(repeatEmailForVerifyUser))

export default router;