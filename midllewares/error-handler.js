import { HttpCode } from '../lib/constants';

const wrapperError = (fn) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next)
        return result
    } catch (err) {
        switch (err.name) {
            case 'CustomError':
                return res.status(err.status).json(
                    {
                    status: 'error',
                    code: err.status,
                    message: err.message,
                    });
            case 'ValidationError': // если ошибка в базе Mongo
                return res.status(HttpCode.BAD_REQUEST).json(
                    {
                    status: 'error',
                    code: HttpCode.BAD_REQUEST,
                    message: err.message,
                    });
            default:
                next(err)
                break;
        }
    }
}

export default wrapperError;