import Message from "./Message";
import User from "./User";


export default class Star{
    message: Message | null = null;
    starredBy: User | null = null;
};