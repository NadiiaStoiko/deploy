import { ISaleProduct } from './sale-product.model';

export interface IInvoice {
    invoiceId?: number;
    creditNoteId?: number;
    attachment?: number;
    attachmentDownloadCount: number;
    offerId: number;
    offerNumber: number;
    offerDate: string;
    invoiceNumber: number;
    creditNoteNumber?: number;
    description: string;
    status: string;
    totalAmount: number;
    penaltyAmount: number;
    dateCreation: string;
    dueDate: string;
    comment?: string;
    contact?: number;
    typeInvoice: string;
    productsPositions: ISaleProduct[];
}
