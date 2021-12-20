import Joi from 'joi';

const createSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(20).required(),
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
}).or('name', 'email', 'phone')

const idSchema = Joi.object({id: Joi.string().required()})

export const validateCreate = async (req, res, next) => {
    try {
        const value = await createSchema.validateAsync(req.body);
    }
    catch (err) {
        if (type === 'string.email') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        return res.status(400).json({ message: 'missing required name field' })
    }
    next()
}

export const validateUpdate = async (req, res, next) => {
    try {
        const value = await updateSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'string.email') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        return res.status(400).json({ message: 'Missing fields' })
    }
    next()
}

export const validateId = async (req, res, next) => {
    try {
        const value = await idSchema.validateAsync(req.params);
    }
    catch (err) {
        return res.status(400).json({ message: `${err.message.replace(/"/g, '')}` })
    }
    next()
}