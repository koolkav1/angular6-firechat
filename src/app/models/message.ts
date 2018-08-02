import { User } from '../interfaces/user';
export class Message {
    message: string;
    createdAt: Date;
    sender: User;
    constructor({message, createAt, sender}){
        this.message = message;
        this.createdAt = createAt;
        this.sender = sender;
    }
}
