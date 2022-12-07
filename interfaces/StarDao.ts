/**
 * @file Declares interface for Starred related data access object methods.
 */
import Star from "../models/Star";

export default interface StarDao{
    userStarsMessage(uid: string, mid: string):Promise<Star>;
    userUnstarsMessage(uid: string, mid: string): Promise<any>;
    findAllStarredMessagesByUser(uid:string):Promise<Star[]>;
}