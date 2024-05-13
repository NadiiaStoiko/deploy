export interface Employee {
    personId: number;
    username: string;
    email: string;
    bio: string;
    image: string;
    languageName: string;
    applicationId: number;
    companyId: number;
}

export interface IUserToEdit {
    userId?: number;
    username: string;
    email: string;
}

export interface IUserFull extends IUserToEdit {
    personId: number;
    isAdmin: boolean;
    isGlobalAdmin: boolean;
    adminLevel: number;
}

export interface IUserPassword {
    userId: number;
    password: string;
}
