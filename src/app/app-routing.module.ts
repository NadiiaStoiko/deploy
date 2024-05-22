import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {
    InvoiceCreateWpapperComponent
} from "./feature/sales/invoices/invoice-create/invoice-create-wpapper/invoice-create-wpapper.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'invoices/create',
        component: InvoiceCreateWpapperComponent,
    },
    {
        path: 'auth',
        loadChildren: () => import('./shared/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'invoices',
        loadChildren: () => import('./feature/sales/invoices/invoices.module').then( m => m.InvoicesModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./feature/sales/dashboard/dashboard.module').then( m => m.DashboardModule)
    },
    {
        path: 'draft-invoices',
        loadChildren: () => import('./feature/sales/draft-invoices/draft-invoices.module').then( m => m.DraftInvoicesModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
