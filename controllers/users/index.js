import { HttpCode } from '../../lib/constants';
import {
  UploadFileService,
  LocalFileService,
} from '../../service/file-storage';
import repositoryUsers from '../../repository/users';
import {
  EmailService,
  SenderSendGrid
} from '../../service/email';
import { CustomError } from '../../lib/custom-error';


const currentUser = async (req, res, _next) => {

    const { email, subscription } = req.user;
  if (!req.user.token || !req.user.id) {
      throw new CustomError(HttpCode.UNAUTORIZED, 'Not authorized');   
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

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  console.log(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    return res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Verification successful' },
    })
  }
  throw new CustomError(HttpCode.BAD_REQUEST, 'Invalid token');  
}

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmail(email)
  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrid(),
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyToken,
    )
    if (isSend) {
      return res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Verification email sent' },
    })

    }
    throw new CustomError(HttpCode.SU, 'Service Unavailable');  
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'User with email not found');  
}

export { currentUser, uploadAvatar, verifyUser, repeatEmailForVerifyUser }