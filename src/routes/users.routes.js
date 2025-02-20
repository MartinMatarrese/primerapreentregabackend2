import { Router } from "express";
import { userContoller } from "../controllers/user.controller.js";
import { passportCall } from "../passport/passportCall.js";

const userRouter = Router()

userRouter.post("/register", userContoller.register);

userRouter.post("/login", userContoller.login);

userRouter.get("/current", [ passportCall("current")], userContoller.privateData);

export default userRouter;