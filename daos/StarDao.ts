/**
 * @file Implements DAO managing data storage of stars. Uses mongoose StarModel
 * to integrate with MongoDB.
 */
import StarDaoI from "../interfaces/StarDao";
import Star from "../models/Star";
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
     * Uses StarModel to retrieve all messages starred by a specific user
     * @param {string} uid Primary key of the user that starred a message
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findAllStarredMessagesByUser(uid: string): Promise<Star[]> {
        return StarModel.find({starredBy: uid});
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
     * Removes an existing star instance from the database
     * @param {string} uid Primary key of the user that starred the message
     * @param {string} mid Primary key of the message that was starred
     * @returns Promise To be notified when like is removed from the database
     */
    async userUnstarsMessage(uid: string, mid: string): Promise<any> {
        return StarModel.deleteOne({
            message: mid,
            starredBy: uid
        });
    }

}