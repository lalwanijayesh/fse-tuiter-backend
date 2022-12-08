/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB.
 */
import MessageDaoI from "../interfaces/MessageDao"
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
const mongoose= require('mongoose');

/**
 * @class MessageDao Implements Data Access Object managing data
 * storage of Messages.
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    };
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {string} uid Primary key of the user that sends the message
     * @param {string} ruid Primary key of the user that string the message
     * @param {string} message message context that is being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    async userMessagesAnotherUser(uid: string, ruid: string, message: string): Promise<Message> {
        return MessageModel
            .create({
                message: message,
                from: uid,
                to: ruid,
                edited: false
            });
    }

    /**
     * Uses MessageModel to retrieve messages that are sent by a specified user
     * @param {string} uid Primary key of the user that sent the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesSentByUser(uid: string): Promise<Message[]> {
        return MessageModel
            .find({from: uid})
            .populate('to', 'username')
            .exec();
    }
    /**
     * Uses MessageModel to retrieve messages that are sent to a specified user
     * @param {string} uid Primary key of the user to whom the messages are sent
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesReceivedByUser(uid: string): Promise<Message[]> {
        return MessageModel
            .find({to: uid})
            .populate('from', 'username')
            .exec();
    }

    /**
     * Removes an existing message from the database
     * @param {string} mid Primary key of the message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    async deleteMessage(mid: string): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }

    /**
     * Updates an existing message in the database with new values
     * @param {string} mid Primary key of the message to be updated
     * @param {string} message Updated message content
     * @returns Promise To be notified when message is updated in the database
     */
    async updateMessage(mid: string, message: string): Promise<any> {
        return MessageModel.findOneAndUpdate({_id: mid},
            {$set: {message: message}}, {returnOriginal: false}
        );
    }

    /**
     * Uses MessageModel to retrieve messages exchanged between two users
     * @param {string} uid Primary key of the user that sent the messages
     * @param {string} ruid Primary key of the user that received the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesBetweenUsers(uid: string, ruid: string): Promise<Message[]> {
        return MessageModel
            .find({$or: [{from: uid, to: ruid}, {from: ruid, to: uid}]})
            .populate('from', 'username')
            .populate('to', 'username')
            .sort({sentOn: 1})
            .exec();
    }

    /**
     * Gets latest sent/received message for the logged in user from their chat.
     * @param {string} uid user id of the logged in user.
     * @returns Promise To be notified when message is updated in the database
     */
    async getLatestMessageForUser(uid: string): Promise<Message[]>{
        let id = mongoose.Types.ObjectId(uid);
        const result = await MessageModel.aggregate([
            { $match: { $or : [{ from: id },{to:id}]}},{$sort:{'sentOn':-1}}
            ,{$group:{_id:{from:"$from",to:"$to"}
                    ,"doc":{"$first":"$$ROOT"}}},{"$replaceRoot":{"newRoot":"$doc"}},
            {$lookup: {
                    from: "users",
                    localField: "from",
                    foreignField: "_id",
                    as: "from"
                }},{$lookup: {
                    from: "users",
                    localField: "to",
                    foreignField: "_id",
                    as: "to"
                }}
            , { $unwind: "$from" }, { $unwind: "$to" }
        ]);
        return result;
    }
}