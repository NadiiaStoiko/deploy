export interface IAccountingCompany {
    initialSettings?: boolean;
    isOnBoardingPassed: boolean;
    companyId?: number;
    userId?: number;
    name: string;
    address: string;
    postcode: string;
    countryId: number;
    city: string;
    cvrNumber: number;
    email: string;
    phoneNumber: string;
    homepage: string;
    numberEAN: number;
    contactPerson: string;
    companyLogoId?: number | null;
    isDeleted: boolean;
}
