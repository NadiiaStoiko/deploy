import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ERROR_MESSAGES, Errors, ChangePassword} from "../../app.config";
import {UserService} from 'src/app/core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {confirmedValidator} from './matchingValidator';
import {IonModal} from '@ionic/angular';
import {catchError, tap} from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

    public user2FAEnabled!: boolean;
    public twoFADialogOpened = false;
    public showInvalid2FADialog = false;
    public isSubmitting = false;
    public showInvalidDialog = false;
    public authType = '';
    public title = '';
    public errors: Errors = {errors: {}};
    public errorMessage: string = '';
    public isItErrorNotification: boolean = false;

    public loginForm: FormGroup;
    public ERRERROR_MESSAGES = ERROR_MESSAGES;
    public ChangePassword = ChangePassword;

    // 403 Forbidden
    isNewCredentialsRequired: boolean = false;
    changeCredentialsForm!: FormGroup;
    public confirmBtn = [
        {
            text: 'Okay',
            role: 'okay',
            handler: () => {
                this.showInvalidDialog = false;
            }
        }
    ];


    constructor(
        private formBuilder: FormBuilder,
        private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
        this.buildForm();
        this.authType = 'login'
    }

    customCounterFormatter(inputLength: number, maxLength: number) {
        return `${maxLength - inputLength} characters remaining`;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.markFormFieldsAsTouched();
        }

        this.submitForm();

        this.userService.check2FactorAuth(this.loginForm.value.email).subscribe((data: boolean) => {
            this.user2FAEnabled = data;
            if (this.user2FAEnabled) {
                this.twoFADialogOpened = true;
                this.loginForm.addControl('googleAuthKey',
                    new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]));
            } else {
                this.isSubmitting = true;
                this.submitForm();
            }
        });
    }

    submitForm() {
        this.errors = {errors: {}};
        const credentials = this.loginForm.value;
        console.log('credentials', credentials);
        this.userService
            .attemptAuth(this.authType, credentials)
            .subscribe(
                data => {
                    this.router.navigateByUrl('home');
                    //this.localizationsService.populateLookupTable({});
                    //window.location.href = "/"; // force reload.
                },
                err => {
                    if (err.status === 401) {
                        this.errors = err;
                        this.errorDialogLogic();
                        this.isSubmitting = false;
                    }
                    if (err.status === 403) {
                        if (this.twoFADialogOpened) {
                            this.twoFADialogOpened = false;
                        }
                        this.isNewCredentialsRequired = true;
                        this.newCredentialsRequired();
                        this.isSubmitting = false;
                    }
                }
            );
    }

    newCredentialsRequired() {
        this.changeCredentialsForm = new FormGroup({
                email: new FormControl(this.loginForm.value.email, Validators.required),
                currentPassword: new FormControl(this.loginForm.value.password, Validators.required),
                newPassword: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ]),
                newPasswordMatch: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8)
                ])
            }, [
                confirmedValidator('newPassword', 'newPasswordMatch')
            ]
        );
    }

    toggleTwoFADialog() {
        this.twoFADialogOpened = !this.twoFADialogOpened;
    }

    errorDialogLogic() {
        if (this.twoFADialogOpened === true) {
            this.showInvalid2FADialog = true;
        } else {
            this.showInvalidDialog = true;
        }
    }

    closeNewCredentialsRequired() {
        this.isNewCredentialsRequired = false;
    }

    submitNewCredentials() {
        console.log('this.changeCredentialsForm', this.changeCredentialsForm.value);
        const credentials = this.changeCredentialsForm.value;
        delete credentials.newPasswordMatch;

        console.log('credentials', credentials);

        this.userService.setNewCredentials(credentials).pipe(
            tap(() => {
                this.isNewCredentialsRequired = false;
                // this.showSuccess();
            }),
            catchError(err => {
                this.isItErrorNotification = true;
                this.errorMessage = err;
                throw new Error(err);
            })
        ).subscribe();
    }

    private markFormFieldsAsTouched() {
        Object.values(this.loginForm.controls).forEach(control => {
            control.markAsTouched();
        });
    }

    buildForm(): void {
        this.loginForm = this.fb.group({
            email: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
        });
    }

    get email(): AbstractControl {
        return this.loginForm.get('email')!;
    }

    get password(): AbstractControl {
        return this.loginForm.get('password')!;
    }

    get currentPassword(): AbstractControl {
        return this.changeCredentialsForm.get('currentPassword')!;
    }

    get newPassword(): AbstractControl {
        return this.changeCredentialsForm.get('newPassword')!;
    }

    get newPasswordMatch(): AbstractControl {
        return this.changeCredentialsForm.get('newPasswordMatch')!;
    };
}
