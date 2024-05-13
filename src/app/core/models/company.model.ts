import {Employee} from "./employee.model";
import {CompanyAdmin} from "./company-admin";

export interface Company {
    companyId: number;
    name: string;
    address: string;
    employees: Employee[];
    cvr?: number;
    postcode?: number;
    city?: number;
    email?: string;
    phone: number;
    level?: number;
    parentId?: number;
    globalAdmins?: CompanyAdmin[];
    admins?: CompanyAdmin[];
    subCompanies?: any[];
    logoutTime?: string;
}
