import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        IonicModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule {
}
