import {Component, Input, OnInit} from '@angular/core';
import {IInvoice} from "../../../../core/models/invoice.model";

@Component({
    selector: 'app-invoice-create',
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {

    @Input() invoiceId: number | null = null;
    @Input() invoiceNumber: number;
    @Input() invoiceEdited?: IInvoice;

    constructor() {
        this.invoiceNumber = 0;
    }

    ngOnInit() {
    }

}
