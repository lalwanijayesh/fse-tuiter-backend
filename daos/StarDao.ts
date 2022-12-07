import StarDaoI from "../interfaces/StarDao";
import Star from "../models/Star";

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

    findAllStarredMessagesByUser(uid: string): Promise<Star[]> {
        return Promise.resolve([]);
    }

    userStarsMessage(uid: string, mid: string): Promise<Star> {
        return Promise.resolve(undefined);
    }

    userUnstarsMessage(uid: string, mid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}