export interface IInvoiceListItem {
    id: number;
    invoiceNumber: number;
    offerId: number;
    offerNumber: number;
    dueDate: string;
    dateCreation: string;
    typeInvoice: string;
    description: string;
    invoiceStatus: string;
    mailStatus: string;
    totalAmount: number;
    secondTotalAmount: number;
    remainingAmount: number;
    secondRemainingAmount: number;
    currency: string;
    secondCurrency: string;
    contactName: string;
    contactId: number;
    invoiceId?: number;
    creditNoteNumber?: number;
}
