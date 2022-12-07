import Star from "../models/Star";

export default interface StarDao{
    userStarsMessage(uid: string, mid: string):Promise<Star>;
    userUnstarsMessage(uid: string, mid: string): Promise<any>;
    findAllStarredMessagesByUser(uid:string):Promise<Star[]>;
}