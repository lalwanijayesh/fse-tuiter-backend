/**
 * @file Implements DAO managing data storage of stars. Uses mongoose StarModel
 * to integrate with MongoDB.
 */
import StarDaoI from "../interfaces/StarDao";
import Star from "../models/Star";
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import StarModel from "../mongoose/StarModel";

/**
 * @class StarDao Implements Data Access Object managing data
 * storage of Stars.
 * @property {StarDao} starDao private single instance of StarDao
 */
export default class StarDao implements StarDaoI{

    private static starDao: StarDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns StarDao
     */
    public static getInstance = (): StarDao => {
        if (StarDao.starDao == null) {
            StarDao.starDao = new StarDao();
        }
        return StarDao.starDao;
    };
    private constructor() {}

    /**
     * Insert starred instance into the database
     * @param {string} uid Primary key of the user that starred the tuit
     * @param {string} mid Primary key of the message that was starred
     * @returns return a list of messages starred by the user
     */
    async findAllStarredMessagesByUser(uid: string): Promise<Star[]> {
        return await StarModel
            .find({starredBy: uid})
            .populate({
                path: 'message',
                populate: { path: 'from' }
              })
            .exec();
    }

    /**
     * Insert starred instance into the database
     * @param {string} uid Primary key of the user that starred the tuit
     * @param {string} mid Primary key of the message that was starred
     * @returns Promise To be notified when starred message is inserted into the database
     */
    async userStarsMessage(uid: string, mid: string): Promise<Star> {
        return await StarModel.create({
            message: mid,
            starredBy: uid
        });
    }

    /**
     * Removes an existing starred message from the starred list in database
     * @param {string} mid Primary key of the message to be removed
     * @param {string} uid Primary key of the user who starred the message
     * @returns Promise To be notified when message is removed from the starred list in database
     */
    async userUnstarsMessage(uid: string, mid: string): Promise<any> {
        return await StarModel.deleteOne({message: mid, starredBy: uid});
    }

}