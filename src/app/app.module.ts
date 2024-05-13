import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {FeatureModule} from "./feature/feature.module";
import { HttpClientModule } from '@angular/common/http';
import {DashboardModule} from "./feature/sales/dashboard/dashboard.module";
import {DraftInvoicesModule} from "./feature/sales/draft-invoices/draft-invoices.module";
import { InvoicesModule } from './feature/sales/invoices/invoices.module';
import {HomePageModule} from "./home/home.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        CoreModule,
        FeatureModule,
        HttpClientModule,
        DashboardModule,
        DraftInvoicesModule,
        InvoicesModule,
        HomePageModule
    ],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
