import { userDao } from "../daos/mongodb/user.dao.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Services from "./service.manager.js";
import { cartServices } from "./cart.service.js";
import { CartControllers } from "../controllers/carts.controllers.js";

class UserService extends Services {
    constructor() {
        super(userDao);
    }

    generateToken = (user) => {
        const payLoad = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        };
        
        return jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "10M"});
    };

    getUserByEmail = async(email) => {
        try {
            return await this.dao.getByEmail(email);
        } catch(error) {
            throw new Error(error)
        }
    };

    register = async(user) => {
        try {
            const { email, password} = user;
            const existUser = await this.getUserByEmail(email);
            if(existUser) throw new Error("El usuario ya existe");
            const cartUser = await cartServices.createCart();
            const newUser = await this.dao.register({
                ...user,
                password: createHash(password),
                cart: cartUser._id
            });
            return newUser;
        } catch(error) {
            throw error;
        }
    };

    login = async(user) => {
        try {
            const { email, password } = user;
            const userExist = await this.getUserByEmail(email);
            if(!userExist) throw new Error("Usuario no encontrado");
            const passValid = isValidPassword(password, userExist);
            if(!passValid) throw new Error("Credenciales incorrectas");
            return this.generateToken(userExist);
        } catch (error) {
            throw error;
        }
    };
};

export const userService = new UserService();