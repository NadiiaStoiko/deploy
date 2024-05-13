export interface CompanyAdmin {
    username: string;
    email: string;
    password: string;
    personId?: number;
    isAdmin?: boolean;
    isGlobalAdmin?: boolean;
    adminLevel?: number;
}
