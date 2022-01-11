/* eslint-disable prefer-regex-literals */
/* eslint-disable no-invalid-regexp */
import Joi from 'joi';
import pkg from 'mongoose';
import { MIN_AGE, MAX_AGE } from '../../lib/constants';


const { Types } = pkg;

const createSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(20).required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'age', 'favorite')

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})


const querySchema = Joi.object({
    favorite: Joi.bool().required(),
    limit: Joi.string().pattern(new RegExp('\\d+')).optional(),
    skip: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid('name', 'email', 'age', 'phone', 'favorite').optional(),
    sortByDesc: Joi.string().valid('name', 'email', 'age', 'phone', 'favorite').optional(),
    filter: Joi
        .string()
        .pattern(new RegExp('(name|email|age|phone|favorite)\\|?(name|email|age|phone|favorite)+'))
        .optional()
})

export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
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
        await updateSchema.validateAsync(req.body);
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

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.missing') {
           return res.status(400).json({ message: 'Missing fields favorite' })
        }
        return res.status(400).json({ message: err.message })
    }
    next()
}

export const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid OdjectId' })
    }
    next()
}

export const validateQuery = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query);
    }
    catch (err) {
        return res
            .status(400)
            .json({ message: 'missing required name field' })
    }
    next()
}

