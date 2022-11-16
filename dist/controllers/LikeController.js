"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits/:tid/likes to retrieve all users that liked a particular tuit</li>
 *     <li>GET /users/:uid/likes to retrieve all tuits that were liked by a particular user</li>
 *     <li>POST /users/:uid/likes/:tid to create a new like instance</li>
 *     <li>DELETE /users/:uid/likes/:tid to remove a particular like instance</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web Service API
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all users from database that liked a particular tuit
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits from database liked by a particular user
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of tuit objects liked by the user
         */
        this.findAllTuitsLikedByUser = (req, res) => LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
        /**
         * Creates a new like instance
         * @param {Request} req Represents request from client, including path
         * parameter uid and tid, identifying the user and the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new like instance inserted in the database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Removes an existing like instance
         * @param {Request} req Represents request from client, including path
         * parameters uid and tid,identifying the user and the tuit liked
         * @param {Response} res Represents response to client, including status
         * on whether the like instance was succesfully deleted or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
/**
 * Create singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service API
 * @returns LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController == null) {
        LikeController.likeController = new LikeController();
        app.get('/tuits/:tid/likes', LikeController.likeController.findAllUsersThatLikedTuit);
        app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
        app.post('/users/:uid/likes/:tid', LikeController.likeController.userLikesTuit);
        app.delete('/users/:uid/likes/:tid', LikeController.likeController.userUnlikesTuit);
    }
    return LikeController.likeController;
};
;
//# sourceMappingURL=LikeController.js.map