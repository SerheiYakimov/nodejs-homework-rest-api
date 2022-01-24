import Users from "../../repository/users";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
    async isUserExist(email) {
        const user = await Users.findByEmail(email);
        return !!user;
    }

    async create(body) {
        const { id, name, email, subscription, role, avatarURL, verifyToken } = await Users.create(body);
        return {
            id,
            name,
            email,
            subscription,
            role,
            avatarURL,
            verifyToken,
        }
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email);
        console.log(user);
        const isValidPassword = await user?.isValidPassword(password)
        console.log(isValidPassword);
        if (!isValidPassword || user?.verify) {
            return null
        }
        return user
    }


    getToken(user) {
        const { id, email } = user;
        const payload = { id, email };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        return token;
    }

    async setToken(id, token) {
        await Users.updateToken(id, token);
    }
 }

export default new AuthService();