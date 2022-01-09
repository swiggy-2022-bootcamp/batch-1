import { Request, Response } from 'express';
import { upvoteUser, downvoteUser, getUserRank } from '../../data/profile/profile.data';

export const upvote = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const id = res.locals.id;
    const { status, message } = await upvoteUser(userid, id)
    res.status(status).send({ message });
}

export const downvote = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const id = res.locals.id;
    const { status, message } = await downvoteUser(userid, id)
    res.status(status).send({ message });
}
export const getRank = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const { status, message } = await getUserRank(userid)
    res.status(status).send({ message });
}