import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {Observable, Subject, takeUntil} from "rxjs";
import {IInvoiceListItem} from "../../../core/models/invoice-list-item.model";
import {ErrorMessageDialogComponent} from "../../../shared/dialogs/error-message-dialog/error-message-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountingInvoiceService} from "../../../core/services/accounting-invoice.service";
import {SettingsService} from "../../../core/services/settings.service";

@Component({
    selector: 'app-invoice-wrapper',
    template: `
    <ion-content>
        <app-invoices
            [invoices$]="invoices$"
        ></app-invoices>

        <app-error-message-dialog #errorDialog></app-error-message-dialog>\`
    </ion-content>
    `,
})

export class InvoiceWrapperComponent  implements OnInit, OnDestroy {

    // @ViewChild('errorDialog') errorDialog: ErrorMessageDialogComponent;
    // public isPaymentDialogOpened = false;
    // public invoiceToPay: IInvoiceListItem;
    // public paymentAttachmentId: number;
    // public paymentData: IInvoicePaymentData;
    public invoices$!: Observable<IInvoiceListItem[]>;
    // public invoicesToCreditNotes$: Observable<IInvoiceListItem[]>;
    // public creditNotes$: Observable<IInvoiceListItem[]>;
    // public inventories: IInventorySimplified[];
    public isLoading = true;
    // public selectedYear: number;
    // public isYearOpen = true;
    private invoiceService = inject(AccountingInvoiceService);
    private accountingSettingsService = inject(SettingsService);
    // private notificationService = inject(NotificationService);
    private router: Router;
    private activatedRoute: ActivatedRoute;
    private settingsService: SettingsService;
    private destroy$: Subject<boolean> = new Subject();

    constructor(router: Router, activatedRoute: ActivatedRoute, settingsService: SettingsService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.settingsService = settingsService;
    }
    ngOnInit(): void {
        this.invoices$ = this.invoiceService.setInvoices();
        this.invoiceService.setInvoices().pipe(
            takeUntil(this.destroy$),
            // catchError(err => {
            //     this.isLoading = false;
            //     this.errorDialog.openError(err.message);
            //     throw new Error(err);
            // })
        ).subscribe(() => this.isLoading = false);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    // onCreateInvoice() {
    //     this.invoiceService.createInvoice().pipe(
    //         takeUntil(this.destroy$),
    //         // catchError(err => {
    //         //     this.errorDialog.openError(err.message);
    //         //     throw new Error(err);
    //         // }),
    //     ).subscribe(invoiceId => {
    //         this.route.navigate(['/bookkeeping/invoices/create'], { queryParams: { invoiceId: invoiceId } });
    //     });
    // }

    onInvoiceSeen(invoice: IInvoiceListItem) {
        if (invoice.typeInvoice === 'credit note') {
            this.router.navigate(['/bookkeeping/sales/view'], { queryParams: { creditNoteId: invoice.id } });
        } else {
            this.router.navigate(['/bookkeeping/sales/view'], { queryParams: { invoiceId: invoice.id } });
        }
    }

    onInvoiceSeenAndMailSent(eventData: { invoice: IInvoiceListItem; sendMail: boolean }) {
        const { invoice, sendMail } = eventData;
        if (invoice.typeInvoice === 'credit note') {
            this.router.navigate(['/bookkeeping/sales/view'], { queryParams: { creditNoteId: invoice.id, sendMail } });
        } else {
            this.router.navigate(['/bookkeeping/sales/view'], { queryParams: { invoiceId: invoice.id, sendMail } });
        }
    }

    onInvoiceDeleted(invoice: IInvoiceListItem) {
        if (invoice.typeInvoice === 'credit note') {
            // this.invoiceService.deleteCreditNote(invoice.id).pipe(
            //     takeUntil(this.destroy$),
            //     // catchError(err => {
            //     //     this.errorDialog.openError(err.message);
            //     //     throw new Error(err);
            //     // })
            // ).subscribe();
        } else {
            // this.invoiceService.deleteInvoice(invoice.id).pipe(
            //     takeUntil(this.destroy$),
            //     // catchError(err => {
            //     //     this.errorDialog.openError(err.message);
            //     //     throw new Error(err);
            //     // })
            // ).subscribe();
        }
    }

    onInvoiceApproved(invoiceApproved: IInvoiceListItem) {
        if (invoiceApproved.typeInvoice === 'credit note') {
            // this.invoiceService.approveCreditNote({ creditNoteId: invoiceApproved.id }).pipe(
            //     takeUntil(this.destroy$),
            //     catchError(err => {
            //         this.errorDialog.openError(err.message);
            //         throw new Error(err);
            //     })
            // ).subscribe();
        } else {
            // this.invoiceService.approveInvoice(invoiceApproved.id).pipe(
            //     takeUntil(this.destroy$),
            //     // catchError(err => {
            //     //     this.errorDialog.openError(err.error.errors.Message);
            //     //     throw new Error(err);
            //     // })
            // ).subscribe();
        }
    }

    // onInvoiceCopied(invoice: IInvoiceListItem) {
    //     this.invoiceService.copyInvoice(invoice.id).pipe(
    //         takeUntil(this.destroy$),
    //         catchError(err => {
    //             this.errorDialog.openError(err.message);
    //             throw new Error(err);
    //         }),
    //     ).subscribe(invoiceId => {
    //         this.route.navigate(['/bookkeeping/invoices/create'], { queryParams: { invoiceId: invoiceId } });
    //     });
    // }

    // onCreditNoteCreated(invoiceId: number) {
    //     this.invoiceService.createCreditNoteDeletion(invoiceId).pipe(
    //         takeUntil(this.destroy$),
    //         catchError(err => {
    //             this.errorDialog.openError(err.message);
    //             throw new Error(err);
    //         })
    //     ).subscribe((result) => {
    //         if (result.length) {
    //             result[0].forEach((item)=> {
    //                 if (item.invoiceId === invoiceId) {
    //                     this.route.navigate(['/bookkeeping/sales/view'], { queryParams: { creditNoteId: item.id } });
    //                 }
    //             });
    //         }
    //     });
    // }

    onInvoiceStatusChange(status: string) {
        this.invoiceService.getInvoicesByStatus(status).pipe(
            takeUntil(this.destroy$),
            // catchError(err => {
            //     // this.errorDialog.openError(err.message);
            //     // throw new Error(err);
            // })
        ).subscribe();
    }

    // payment methods

    // onPaymentDialogOpened(invoice: IInvoiceListItem) {
    //     this.invoiceToPay = invoice;
    //
    //     let date = new Date();
    //     if (this.selectedYear < new Date().getFullYear()) {
    //         date = null;
    //     }
    //
    //     this.invoiceService.getPaymentData(this.invoiceToPay.id, this.getFormattedDateTime(date)).pipe(
    //         takeUntil(this.destroy$),
    //         catchError(err => {
    //             this.errorDialog.openError(err.message);
    //             throw new Error(err);
    //         }),
    //     ).subscribe(payment => {
    //         this.paymentData = payment;
    //         this.isPaymentDialogOpened = true;
    //     });
    // }
    //
    // onPaymentDialogClosed() {
    //     this.invoiceToPay = null;
    //     this.isPaymentDialogOpened = false;
    // }
    //
    // onPaymentConfirmed(payment: IInvoiceCreatePaymentRequest) {
    //     payment.invoiceId = this.invoiceToPay.id;
    //     payment.attachment = this.paymentAttachmentId;
    //     this.invoiceService.registerPayment(payment).pipe(
    //         tap(()=> this.showSuccess()),
    //         takeUntil(this.destroy$),
    //         catchError(err => {
    //             this.errorDialog.openError(err.message);
    //             throw new Error(err);
    //         }),
    //     ).subscribe();
    //     this.isPaymentDialogOpened = false;
    //     this.invoiceToPay = null;
    // }
    //
    // onAttachmentAdded(file) {
    //     this.invoiceService.addAttachment(file).pipe(
    //         takeUntil(this.destroy$),
    //         catchError(err => {
    //             this.errorDialog.openError(err.message);
    //             throw new Error(err);
    //         }),
    //     ).subscribe(reponse => {
    //         this.paymentAttachmentId = reponse.id;
    //     });
    // }

    // public showSuccess(): void {
    //     this.notificationService.show({
    //         content: 'The payment is successfully registered!',
    //         hideAfter: 1000,
    //         position: { horizontal: 'center', vertical: 'top' },
    //         animation: { type: 'fade', duration: 400 },
    //         type: { style: 'success', icon: true },
    //     });
    // }

    // getFormattedDateTime(date: Date | string) {
    //     const correctDate = DateTime.fromJSDate(new Date(date));
    //     return correctDate.toFormat('yyyy-MM-dd');
    // }

}
