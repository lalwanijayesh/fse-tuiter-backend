import StarControllerI from "../interfaces/StarController";
import {Request, Response, Express} from "express";
import StarDao from "../daos/StarDao";

export default class StarController implements StarControllerI{

    private static starDao: StarDao = StarDao.getInstance();
    private static starController: StarController | null = null;

    public static getInstance = (app: Express): StarController => {
        if (StarController.starController == null) {
            StarController.starController = new StarController();
            //app.get('/tuits/:tid/likes', StarController.starController.findAllUsersThatLikedTuit);
            //app.get('/users/:uid/likes', StarController.starController.findAllTuitsLikedByUser);
            app.post('/users/:uid/stars/:mid', StarController.starController.userStarsMessage);
        }
        return StarController.starController;
    }
    private constructor() {}

    findAllStarredMessagesByUser(req: Request, res: Response): void {
    }

    userStarsMessage(req:Request, res: Response): void {
    }

    userUnstarsMessage(req: Request, res: Response): void {
    }

}