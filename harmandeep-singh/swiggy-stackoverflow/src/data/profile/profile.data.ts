
import { config } from "../../config";
import User from "../../models/user.model";

export const upvoteUser = async (userid: string, id: string) => {
    if (userid === id) {
        return {
            status: config.STATUS.FORBIDDEN,
            message: "You cannot upvote yourself"
        }
    }
    const user = await User.findById(userid);
    if (user) {
        user.points += 10;
        user.upvotes.push(id);
        await user.save();
    }
    return {
        status: config.STATUS.SUCCESS,
        message: "User upvoted"
    };
}

export const downvoteUser = async (userid: string, id: string) => {
    if (userid === id) {
        return {
            status: config.STATUS.FORBIDDEN,
            message: "You cannot downvote yourself"
        }
    }
    const user = await User.findById(userid);
    if (user) {
        user.points = user.points - 1 ? user.points - 1 : 0;
        user.downvotes.push(id);
        await user.save();
    }
    return {
        status: config.STATUS.SUCCESS,
        message: "User downvoted"
    };
}

export const getUserRank = async (userid: string) => {
    const user = await User.findById(userid);
    if (!user) {
        return {
            status: config.STATUS.NOT_FOUND,
            message: "User not found",
        }
    }
    let message = "grey";
    if (user.points > 2200) {
        message = "red";
    } else if (user.points > 1800) {
        message = "orange";
    } else if (user.points > 1200) {
        message = "yellow";
    }
    return {
        status: config.STATUS.SUCCESS,
        message,
    }
}
