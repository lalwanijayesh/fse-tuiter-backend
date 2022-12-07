/**
 * @file Declares Star data type representing relationship
 * between users and messages, as in user stars a message.
 */
import Message from "./Message";
import User from "./User";

/**
 * @typedef Star Represents stars relationship between a user and a message,
 * as in user stars a message.
 * @property {Message} message Message being starred
 * @property {User} starredBy User stars the tuit
 */
export default class Star{
    message: Message | null = null;
    starredBy: User | null = null;
};