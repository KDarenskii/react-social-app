interface ILastMessage {
    text: string;
    photo: string | null;
}

export interface IConversation {
    members: string[];
    id: string;
    lastMessage: ILastMessage | null;
    lastUpdateTime: string | null;
}
