import { Router } from 'express';
import { currentUser, uploadAvatar } from '../../../controllers/users';
import guard from '../../../midllewares/guard/guard';
import { upload } from '../../../midllewares/upload';

const router = new Router();

router.get('/current', guard, currentUser);
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);


export default router;