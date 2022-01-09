import { Router } from 'express';
import { register, login } from '../controllers/auth/auth.controller';
import { validateLogin, validateRegister } from '../middleware/validators/auth/auth.validator';

const authRouter = Router();

export default (router: Router): void => {
    router.use('/auth', authRouter);
    authRouter.post("/register", validateRegister, register);
    authRouter.post("/login", validateLogin, login);
}