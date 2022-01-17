import { HttpCode } from '../../lib/constants';
import {
  UploadFileService,
  LocalFileService,
} from '../../service/file-storage';


const currentUser = async (req, res, _next) => {

    const { email, subscription } = req.user;
    if (!req.user.token || !req.user.id) {
      return res.status(HttpCode.UNAUTORIZED).json(
        {
        status: 'error',
        code: HttpCode.UNAUTORIZED,
        message: 'Not authorized',
        })  
    }
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user: {email,subscription} },
    });
};
  
const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileService,
    req.file,
    req.user
  )
  const avatarUrl = await uploadService.updateAvatar()
  res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    })
}

export { currentUser, uploadAvatar }