import { Router } from 'express';
import authRouter from './auth.router';
import profileRouter from './profile.router';
import questionRouter from './questions.router';

export default (): Router => {
    const router = Router();
    authRouter(router);
    profileRouter(router);
    questionRouter(router);
    return router;
}