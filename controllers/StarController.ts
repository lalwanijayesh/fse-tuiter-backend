/**
 * @file Declares Controller for the RESTful Web service API of stars resource.
 */
import StarControllerI from "../interfaces/StarController";
import {Request, Response, Express} from "express";
import StarDao from "../daos/StarDao";

/**
 * @class StarController Implements RESTful Web service API for stars resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *
 * </ul>
 * @property {StarDao} starDao Singleton DAO implementing star CRUD operations
 * @property {StarController} starController Singleton controller implementing
 * RESTful Web Service API
 */
export default class StarController implements StarControllerI{

    private static starDao: StarDao = StarDao.getInstance();
    private static starController: StarController | null = null;

    public static getInstance = (app: Express): StarController => {
        if (StarController.starController == null) {
            StarController.starController = new StarController();
            app.post('/users/:uid/stars/:mid', StarController.starController.userStarsMessage);
            app.delete('/users/:uid/stars/:mid', StarController.starController.userUnstarsMessage);
            app.get('/starred/:uid', StarController.starController.findAllStarredMessagesByUser);
        }
        return StarController.starController;
    }
    private constructor() {}

    /**
     * Retrieve all starred message instances starred by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid, identifying the primary key of the user who has starred a message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of starred message instances objects starred by specified user
     */
    findAllStarredMessagesByUser(req: Request, res: Response): void {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        let userId = uid === 'me' && profile ? profile._id : uid;

        if(userId === null){
            res.status(503).send("User needs to be logged in to unstar a message!");
            return;
        }
        StarController.starDao.findAllStarredMessagesByUser(userId)
            .then(starred => res.json(starred))


    }

    /**
     * Creates a new star instance
     * @param {Request} req Represents request from client, including path
     * parameter uid and mid, identifying the user and the starred message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new star instance inserted in the database
     */
    userStarsMessage=(req:Request, res: Response) =>
    StarController.starDao.userStarsMessage(req.params.uid, req.params.mid)
        .then(stars => res.json(stars));

    /**
     * Removes an existing star instance
     * @param {Request} req Represents request from client, including path
     * parameters uid and mid,identifying the user and the message starred
     * @param {Response} res Represents response to client, including status
     * on whether the star instance was successfully deleted or not
     */
    userUnstarsMessage(req: Request, res: Response): void {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        let userId = uid === 'me' && profile ? profile._id : uid;

        if(userId === null){
            res.status(503).send("User needs to be logged in to unstar a message!");
            return;
        }
        StarController.starDao.userUnstarsMessage(userId, req.params.mid)
            .then(status => res.json(status));
    }

}