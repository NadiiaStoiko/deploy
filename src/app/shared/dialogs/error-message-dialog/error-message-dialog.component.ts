import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-error-message-dialog',
    templateUrl: './error-message-dialog.component.html',
    styleUrls: ['./error-message-dialog.component.scss'],
})
export class ErrorMessageDialogComponent {

    // errorDescription;
    opened = false;
    dialogHeader = 'Error';
    // closeFunction = null;

    constructor(private cdr: ChangeDetectorRef) {
    }

    // closeError(status) {
    //     this.cdr.detectChanges();
    //     this.opened = false;
    //     // this.closeFunction();
    //
    //     // modalController.dismiss();
    // }

    // openError(message, dialogHeader = 'Error', closeFunc = () => {
    // }) {
    //     this.opened = true;
    //     this.errorDescription = message;
    //     this.dialogHeader = dialogHeader;
    //     this.closeFunction = closeFunc;
    //     this.cdr.detectChanges();
    // }

}
