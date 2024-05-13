import {InvoicesComponent} from "./invoices.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { InvoiceWrapperComponent } from "./invoice-wrapper.component";

const routes: Routes = [
    {
        path: '',
        component: InvoiceWrapperComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule { }
