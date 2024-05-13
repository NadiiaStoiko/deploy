import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {InvoicesRoutingModule} from "../invoices/invoices-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {DraftInvoicesComponent} from "./draft-invoices.component";
import {DraftInvoicesWrapperComponent} from "./draft-invoices-wrapper/draft-invoices-wrapper.component";
import {DraftInvoicesRoutingModule} from "./draft-invoices-routing.module";



@NgModule({
  declarations: [
      DraftInvoicesComponent,
      DraftInvoicesWrapperComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      DraftInvoicesRoutingModule,
      SharedModule,
  ]
})
export class DraftInvoicesModule { }
