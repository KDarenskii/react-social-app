export interface IMessageDto {
    text: string;
    senderId: string;
    receiverId: string;
    conversationId: string;
    photo: string | null;
    firstName: string;
    lastName: string;
}

export interface IMessage extends IMessageDto {
    time: string;
    id: string;
}
