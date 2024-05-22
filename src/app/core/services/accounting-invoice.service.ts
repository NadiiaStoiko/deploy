import {EventEmitter, inject, Injectable, Output} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AccountingApiService} from "./accounting-api.service";
import {SettingsService} from "./settings.service";
import {IInvoiceListItem} from "../models/invoice-list-item.model";
import {IInvoice} from "../models/invoice.model";
import {IInvoiceTotal} from "./invoice-total.model";

@Injectable({
    providedIn: 'root'
})
export class AccountingInvoiceService {
    public invoiceSubject$ = new BehaviorSubject<IInvoiceListItem[]>([]);
    public invoiceToCreditNotes$ = new BehaviorSubject<IInvoiceListItem[]>([]);
    public productsTotal$ = new BehaviorSubject<IInvoiceTotal[]>([]);
    // public invoiceLogs$ = new BehaviorSubject<IInvoiceLogs[]>([]);
    // public invoicePayments$ = new BehaviorSubject<IInvoicePaymentsHistory>({remainingAmount: 0, payments: []});
    // public previewData$ = new BehaviorSubject<ISalesPreview>({} as ISalesPreview);
    // public allReminders$ = new BehaviorSubject<IReminder[]>([]);
    public creditNoteSubject$ = new BehaviorSubject<IInvoiceListItem[]>([]);
    private accountingApiService = inject(AccountingApiService);

    constructor(
        private http: HttpClient,
        private settingsService: SettingsService
    ) {}

    get companyId(): number {
        return this.settingsService.getManagedCompanyId();
    }

    // Invoice methods

    setInvoices(): Observable<IInvoiceListItem[]> {
        console.log('this.companyId', this.companyId);
        return this.accountingApiService.get(`/sales/invoice/companyId/${this.companyId}`).pipe(
            tap((invoices) => {
                this.invoiceSubject$.next(invoices);
                this.invoiceToCreditNotes$.next(
                    invoices.filter(invoice => invoice.invoiceStatus !== 'Paid' &&
                        invoice.invoiceStatus !== 'Draft' &&
                        invoice.invoiceStatus !== 'Overpaid')
                );
            })
        );
    }

    getInvoicesByStatus(query: string): Observable<IInvoiceListItem[]> {
        const params = new HttpParams()
            .set('filter', query);

        return this.accountingApiService.get(`/sales/invoice/companyId/${this.companyId}`, {params}).pipe(
            tap((invoices) => this.invoiceSubject$.next(invoices))
        );
    }

    getInvoices(): Observable<IInvoiceListItem[]> {
        return this.invoiceSubject$.asObservable();
    }

    // getInvoicesToCreditNotes() {
    //     return this.invoiceToCreditNotes$.asObservable();
    // }

    getInvoiceById(id: number): Observable<IInvoice> {
        return this.accountingApiService.get(`/sales/invoice/${id}/companyid/${this.companyId}`);
    }

    getInvoiceNumber(): Observable<number> {
        return this.accountingApiService.get(`/sales/invoices/create/companyId${this.companyId}`);
    }

    // getCreditNoteNumber(): Observable<number> {
    //     return this.accountingApiService.get(`/sales/creditnotes/create/companyId/${this.companyId}`);
    // }

    // invoice drafts

    getInvoiceTotal(): Observable<IInvoiceTotal[]> {
        return this.productsTotal$.asObservable();
    }

    //
    // fetchInvoiceTotal(id: number): Observable<IInvoiceTotal[]> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/total`).pipe(
    //         map(data => data.total),
    //         tap(total => {
    //             this.productsTotal$.next(total);
    //         })
    //     )
    // }
    //
    // createInvoice() {
    //     return this.accountingApiService.post(`/sales/invoice/${this.companyId}`);
    // }
    //
    copyInvoice(id: number) {
        console.log('Copying invoice with id:', id);
        return this.accountingApiService.post(`/sales/invoice/${id}/copy`).pipe(
            tap(response => console.log('Response from API:', response)),
            catchError(err => {
                console.error('Error copying invoice:', err);
                return throwError(err);
            })
        );
    }
    //
    // updateInvoice(data: IInvoiceUpdateRequest) {
    //     return this.accountingApiService.put(`/sales/invoice/${data.id}`, data);
    // }
    //
    // addProductLine(id: number) {
    //     return this.accountingApiService.post(`/sales/invoice/${id}/line`);
    // }
    //
    // addHeadingLine(id: number) {
    //     return this.accountingApiService.post(`/sales/invoice/${id}/line/heading`);
    // }
    //
    // addProductToLine(data: { lineId: number; productId: number }) {
    //     return this.accountingApiService.put(`/sales/invoice/line/${data.lineId}/product/${data.productId}`)
    // }
    //
    // updateLine(request: IInvoiceProductUpdateRequest) {
    //     return this.accountingApiService.put(`/sales/invoice/line/${request.id}`, request);
    // }
    //
    // deleteLine(id: number) {
    //     return this.accountingApiService.delete(`/sales/invoice/line/${id}`);
    // }
    //
    // changeProductsPositions(ids: number[]) {
    //     return this.accountingApiService.put('/sales/invoice/line/position', {ids: ids});
    // }
    //
    // deleteInvoice(invoiceId: number) {
    //     return this.accountingApiService.delete(`/sales/invoice/${invoiceId}/companyid/${this.companyId}`).pipe(
    //         tap(() => {
    //             let updatedInvoices = this.invoiceSubject$.getValue();
    //             updatedInvoices = updatedInvoices.filter(invoice => invoice.id !== invoiceId);
    //             this.invoiceSubject$.next(updatedInvoices);
    //         })
    //     );
    // }
    //
    // approveInvoice(invoiceId: number) {
    //     return this.accountingApiService.patch(`/sales/invoice/${invoiceId}/approve`);
    // }
    //
    // approveAndSendInvoice(data: { attachment: string, invoiceId: number }) {
    //     return this.accountingApiService.post('/sales/invoice/approveandsend', data);
    // }
    //
    // approveInvoiceWithoutSwitchMap(invoiceId: number) {
    //     return this.accountingApiService.patch(`/sales/invoice/approve`, {invoiceId, companyId: this.companyId});
    // }
    //
    // getInvoiceSetting(invoiceId: number): Observable<IInvoiceSetting> {
    //     return this.accountingApiService.get(`/sales/Invoice/${invoiceId}/setting`).pipe(
    //         map(setting => setting.setting)
    //     );
    // }
    //
    // updateInvoiceSetting(request: IInvoiceSetting) {
    //     return this.accountingApiService.put(`/sales/Invoice/${request.invoiceId}/setting`, request).pipe(
    //         switchMap(() => this.fetchInvoiceTotal(request.invoiceId)),
    //         switchMap(() => this.getInvoiceSetting(request.invoiceId))
    //     );
    // }
    //
    // // approved invoice methods
    //
    // getInvoiceLogs(): Observable<IInvoiceLogs[]> {
    //     return this.invoiceLogs$.asObservable();
    // }
    //
    // setInvoiceLogs(id: number): Observable<IInvoiceLogs[]> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/logs`).pipe(
    //         map((response: any) => response.logs),
    //         tap(logs => {
    //             this.invoiceLogs$.next(logs);
    //         })
    //     )
    // }
    //
    // getInvoicePayments(): Observable<IInvoicePaymentsHistory> {
    //     return this.invoicePayments$.asObservable();
    // }
    //
    // setInvoicePayments(id: number): Observable<IInvoicePaymentsHistory> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/payments`).pipe(
    //         map((response: any) => response.history),
    //         tap(history => {
    //             this.invoicePayments$.next(history);
    //         })
    //     )
    // }
    //
    // getInvoicePreviewData(id: number): Observable<ISalesPreview> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/data`).pipe(
    //         map(data => data.data),
    //     );
    // }
    //
    // getInvoicePreviewSubject(): Observable<ISalesPreview> {
    //     return this.previewData$.asObservable();
    // }
    //
    // fetchInvoicePreviewData(id: number): Observable<ISalesPreview> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/data`).pipe(
    //         map(data => data.data),
    //         tap(data => {
    //             this.previewData$.next(data);
    //         })
    //     );
    // }
    //
    // sendInvoice(mail: IInvoiceMail) {
    //     return this.accountingApiService.post(`/sales/Invoice/SendMail`, mail).pipe(
    //         switchMap(() => this.setInvoiceLogs(mail.invoiceId))
    //     );
    // }
    //
    // sendCreditNote(mail: ICreditNoteMail) {
    //     return this.accountingApiService.post(`/sales/CreditNote/SendMail`, mail);
    // }
    //
    // getEInvoice(id: number, companyId: number, standart: string) {
    //     return this.accountingApiService.get(`/sales/Invoice/${id}/CompanyId/${companyId}/Dowland/${standart}/E-Invoice`, {
    //         responseType: 'blob'
    //     });
    // }
    //
    // sendEInvoice(mail: IESalesMail) {
    //     return this.accountingApiService.post(`/sales/Invoice/SendMail/E-Invoice`, mail).pipe(
    //         switchMap(() => this.setInvoiceLogs(mail.invoiceId))
    //     );
    // }
    //
    // // Credit note methods
    //
    // getCreditNotes(): Observable<IInvoiceListItem[]> {
    //     return this.creditNoteSubject$.asObservable();
    // }
    //
    // setCreditNotes(): Observable<IInvoiceListItem[]> {
    //     return this.accountingApiService.get(`/sales/creditnote/companyid/${this.companyId}`).pipe(
    //         tap((crediNotes: IInvoiceListItem[]) => {
    //             this.creditNoteSubject$.next(crediNotes);
    //         })
    //     );
    // }
    //
    // getCreditNoteTotal(id: number) {
    //     return this.accountingApiService.get(`/sales/creditnote/${id}/total`).pipe(
    //         map(total => total.total)
    //     );
    // }
    //
    // getCreditNotePreviewData(id: number): Observable<ISalesPreview> {
    //     return this.accountingApiService.get(`/sales/creditnote/${id}/data`).pipe(
    //         map(data => data.data),
    //     );
    // }
    //
    // approveCreditNote(creditNote: { creditNoteId: number }) {
    //     return this.accountingApiService.patch(`/sales/creditnote/approve`, {
    //         ...creditNote,
    //         companyId: this.companyId
    //     }).pipe(
    //         switchMap(() => this.setCreditNotes())
    //     );
    // }
    //
    // getCreditNoteById(creditNoteId: number): Observable<IInvoice> {
    //     return this.accountingApiService.get(`/sales/creditnote/${creditNoteId}/companyId/${this.companyId}`);
    // }
    //
    // createCreditNote(creditNote: IInvoice) {
    //     return this.accountingApiService.post(`/sales/creditnote`, {...creditNote}).pipe(
    //         switchMap(() => forkJoin([this.setCreditNotes(), this.setInvoices()]))
    //     );
    // }
    //
    // createCreditNoteDeletion(invoiceId: number) {
    //     return this.accountingApiService.post(`/sales/creditnote/frominvoice`, {invoiceId, companyId: this.companyId}).pipe(
    //         switchMap(() => forkJoin([this.setCreditNotes(), this.setInvoices()]))
    //     );
    // }
    //
    // editCreditNote(updatedCreditNote: IInvoice) {
    //     return this.accountingApiService.put(`/sales/creditnote/update`, {...updatedCreditNote}).pipe(
    //         switchMap(() => forkJoin([this.setCreditNotes(), this.setInvoices()]))
    //     );
    // }
    //
    // deleteCreditNote(creditNoteId: number) {
    //     return this.accountingApiService.delete(`/sales/creditnote/${creditNoteId}/companyId/${this.companyId}`).pipe(
    //         switchMap(() => forkJoin([this.setCreditNotes(), this.setInvoices()]))
    //     );
    // }
    //
    // getECreditNote(id: number, companyId: number, standart: string) {
    //     return this.accountingApiService.get(`/sales/CreditNote/${id}/CompanyId/${companyId}/Download/${standart}/E-CreditNote`, {
    //         responseType: 'blob'
    //     });
    // }
    //
    // sendECreditNote(mail: IESalesMail) {
    //     return this.accountingApiService.post(`/sales/CreditNote/SendMail/E-CreditNote`, mail);
    // }
    //
    // getPeppolInstruction() {
    //     return this.accountingApiService.get('/Peppol/Registration-instruction');
    // }


    // payment methods
    //
    // getInventories(): Observable<IInventorySimplified[]> {
    //     return this.accountingApiService.get(`/inventory/${this.companyId}`).pipe(
    //         map(inventory => inventory.inventory)
    //     );
    // }
    //
    // getPaymentData(id: number, date?: string | Date): Observable<IInvoicePaymentData> {
    //     return this.accountingApiService.get(`/sales/invoice/${id}/payment?date=${date}`).pipe(
    //         map(payment => payment.payment)
    //     )
    // }
    //
    // registerPayment(payment: IInvoiceCreatePaymentRequest) {
    //     payment.companyId = this.companyId;
    //     return this.accountingApiService.post(`/sales/invoice/create/payment`, {...payment}).pipe(
    //         switchMap(() => this.setInvoices())
    //     );
    // }
    //
    // deletePayment(paymentId: number, invoiceId: number) {
    //     return this.accountingApiService
    //         .post(`/sales/invoice/create/counterpayment`, {invoiceId, paymentId, companyId: this.companyId})
    //         .pipe(
    //             switchMap(() => this.setInvoices())
    //         );
    // }
    //
    // // invoice attachments
    //
    // addAttachmentToInvoice(data: { invoiceId: number; attachmentId: number }) {
    //     return this.accountingApiService.patch(`/sales/invoice/${data.invoiceId}/attachment/${data.attachmentId}`);
    // }
    //
    // deleteAttachmentFromInvoice(id: number) {
    //     return this.accountingApiService.patch(`/sales/invoice/${id}/attachment/delete`);
    // }
    //
    // addAttachment(file) {
    //     const formData = new FormData();
    //     formData.append('file', file, file.name);
    //     return this.accountingApiService.nonJSONPost(`/filescsv/upload/${this.companyId}`, formData);
    // }
    //
    // getReceiptAttachment(attachmentId: number): Observable<string> {
    //     return this.accountingApiService.get(`/filescsv/att/${attachmentId}/image`).pipe(
    //         map(attachement => attachement.image)
    //     );
    // }
    //
    // getAttachedFile(attachmentId: number) {
    //     return this.accountingApiService.get(`/filescsv/att/${attachmentId}/download`, {
    //         // observe: 'response',
    //         responseType: 'blob'
    //     });
    // }

    // Reminders
    //
    // getAllReminders(): Observable<IReminder[]> {
    //     return this.allReminders$.asObservable();
    // }
    //
    // getRemindersByInvoiceId(invoiceId: number): Observable<IReminder[]> {
    //     const params = new HttpParams()
    //         .set('invoiceId', invoiceId);
    //     return this.accountingApiService.get(`/Reminder/CompanyId/${this.companyId}`, {params});
    // }
    //
    // getRemindersByNumber(): Observable<IReminder[]> {
    //     return this.accountingApiService.get(`/Reminder/CompanyId/${this.companyId}`).pipe(
    //         mergeMap((reponse: IReminder[]) => from(reponse)),
    //         filter((reminders: IReminder) => !reminders.isDelete && reminders.isReminderVisible),
    //         map(reminder => ({
    //             ...reminder,
    //             compensationFee: reminder.compensationFee !== null ? reminder.compensationFee : 0
    //         })),
    //         toArray(),
    //         tap((reminders) => this.allReminders$.next(reminders))
    //     );
    // }
    //
    // getReminderById(reminderId: number): Observable<IReminder> {
    //     return this.accountingApiService.get(`/Reminder/${reminderId}/CompanyId/${this.companyId}`);
    // }
    //
    // createReminder(reminder: IReminder) {
    //     return this.accountingApiService.post(`/Reminder`, reminder);
    // }
    //
    // sendReminder(reminderMail: IReminderMail) {
    //     return this.accountingApiService.post(`/Reminder/SendMail`, reminderMail).pipe(
    //         switchMap(() => this.setInvoiceLogs(reminderMail.invoiceId))
    //     );
    // }
    //
    // deleteReminder(data: { reminderId: number; invoiceId: number; companyId: number }) {
    //     return this.accountingApiService.delete(`/Reminder/${data.reminderId}/Invoice/${data.invoiceId}/CompanyId/${data.companyId}`).pipe(
    //         switchMap(() => this.setInvoiceLogs(data.invoiceId)),
    //         switchMap(() => this.getRemindersByNumber())
    //     );
    // }
}
