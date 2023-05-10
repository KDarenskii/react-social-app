import { ROLES } from "../constants/roles";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: ROLES[];
    friends: string[];
    followings: string[];
    requests: string[];
    status: string;
    city: string;
    birthdate: string;
    studiedAt: string;
    photo: string | null;
}

export type TUserDto = Omit<IUser, "id">;
