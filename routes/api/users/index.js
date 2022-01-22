import { Router } from 'express';
import { currentUser, repeatEmailForVerifyUser, uploadAvatar, verifyUser } from '../../../controllers/users';
import guard from '../../../midllewares/guard/guard';
import { upload } from '../../../midllewares/upload';
import { validateEmail } from '../../../midllewares/validations/usersValidation';

const router = new Router();

router.get('/current', guard, currentUser);
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);
router.get('/verify/:verifyToken', verifyUser);
router.post('/verify', validateEmail, repeatEmailForVerifyUser)

export default router;