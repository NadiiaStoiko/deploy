import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DraftInvoicesWrapperComponent} from "./draft-invoices-wrapper/draft-invoices-wrapper.component";
import {DraftInvoicesComponent} from "./draft-invoices.component";

const routes: Routes = [
    {
        path: '',
        component: DraftInvoicesComponent,
        // component: DraftInvoicesWrapperComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DraftInvoicesRoutingModule {
}
