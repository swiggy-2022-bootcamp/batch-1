import { Router } from 'express';
import { upvote, downvote, getRank } from '../controllers/profile/profile.controller';
import isAuthenticated from '../middleware/authentication/token.auth';

const rewardRouter = Router();

export default (router: Router): void => {
    router.use('/profile', rewardRouter);
    rewardRouter.post("/:userid/upvote", isAuthenticated, upvote);
    rewardRouter.post("/:userid/downvote", isAuthenticated, downvote);
    rewardRouter.get("/:userid/rank", getRank);
}