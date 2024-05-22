import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from "./invoices.component";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {SharedModule} from "../../../shared/shared.module";
import {InvoicesRoutingModule} from "./invoices-routing.module";
import {InvoiceWrapperComponent} from "./invoice-wrapper.component";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from 'src/app/core/interceptors/http.token.interceptor';
import {RegionalNumberFormatPipe} from "../../../shared/pipes/regional-number-format.pipe";
import {InvoiceCreateComponent} from "./invoice-create/invoice-create.component";
import {InvoiceCreateWpapperComponent} from "./invoice-create/invoice-create-wpapper/invoice-create-wpapper.component";


@NgModule({
    declarations: [
        InvoicesComponent,
        InvoiceWrapperComponent,
        InvoiceCreateComponent,
        InvoiceCreateWpapperComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InvoicesRoutingModule,
        SharedModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true
        },
    ]
})
export class InvoicesModule {
}
