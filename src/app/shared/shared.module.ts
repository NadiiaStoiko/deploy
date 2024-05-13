import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {AuthModule} from "./auth/auth.module";
import {ErrorMessageDialogComponent} from "./dialogs/error-message-dialog/error-message-dialog.component";
import { RegionalNumberFormatPipe } from './pipes/regional-number-format.pipe';
import {ModalContentComponent} from "./footer/modal-content/modal-content.component";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ErrorMessageDialogComponent,
        RegionalNumberFormatPipe,
        ModalContentComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        AuthModule,
    ],
    exports: [
        RegionalNumberFormatPipe,
        HeaderComponent,
        FooterComponent,
        AuthModule,
        ErrorMessageDialogComponent,
        ModalContentComponent
    ],
})
export class SharedModule {
}
