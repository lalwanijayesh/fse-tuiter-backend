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

    async findAllStarredMessagesByUser(uid: string): Promise<Star[]> {
        return StarModel.find({uid})
    }

    userStarsMessage(uid: string, mid: string): Promise<Star> {
        return Promise.resolve(undefined);
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