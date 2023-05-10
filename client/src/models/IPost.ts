export interface IPost {
    id: string;
    userId: string;
    text: string;
    photoSrc: string | null;
    likes: string[];
    date: string;
}
