/**
 * @file Declares interface for RESTful web services related to stars.
 */
import {Request, Response} from "express";

export default interface StarController {

    userStarsMessage(req: Request, res: Response):void;
    userUnstarsMessage(req: Request, res: Response): void;
    findAllStarredMessagesByUser(req: Request, res: Response):void;

};