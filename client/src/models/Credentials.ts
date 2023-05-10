export interface ICredentials {
    email: string;
    password: string;
}

export interface IRegistrationCredentials extends ICredentials {
    firstName: string;
    lastName: string;
}