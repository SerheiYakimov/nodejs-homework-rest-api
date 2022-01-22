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

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
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
  // res
  //   .status(HttpCode.NOT_FOUND)
  //   .json({
  //     status: 'error',
  //     code: HttpCode.NOT_FOUND,
  //     data: { message: 'User not found' },
  //   })
  res.status(HttpCode.BAD_REQUEST).json({
    status: 'success',
    code: HttpCode.BAD_REQUEST,
    data: { message: 'Invalid token' },
  })
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
    //TODO
    // return res
    // .status(HttpCode.BAD_REQUEST)
    // .json({
    //   status: 'error',
    //   code: HttpCode.BAD_REQUEST,
    //   data: { message: 'Verification has already been passed' },
    // })
    return res.status(HttpCode.UE).json({
      status: 'error',
      code: HttpCode.UE,
      data: { message: 'Unprocessable Entity' },
    })

  }
  //TODO
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    data: { message: 'User with email not found' },
  })
}

export { currentUser, uploadAvatar, verifyUser, repeatEmailForVerifyUser }