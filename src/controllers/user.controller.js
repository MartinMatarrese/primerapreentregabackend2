import Controllers from "./controller.manager.js";
import { userService } from "../services/user.service.js";

class UserController extends Controllers {
    constructor() {
        super(userService)
    };

    register = async(req, res, next) => {
        try {
            const user = this.service.register(req.body);
            res.json(user);
        } catch(error) {
            next(error)
        }
    };

    login = async(req, res, next) => {
        try {
            const token = this.service.login(req.body);
            res
            .cookie("token", token, { httpOnly: true })
            .json({ message: "Login Ok", token});
        } catch(error) {
            next(error)
        }
    };

    privateData = async(req, res, next) => {
        try {
            if(!req.user)
                throw new Error("No se puede acceder a los datos del usuario");
                res.json({
                    user: req.user
                });
        } catch(error) {
            next(error)
        }
    };
}

export const userContoller = new UserController();