export enum ERROR_MESSAGES {
    required = 'This field cannot be empty!',
    inputMaxlength = 'This field\`s maximum length is 255 symbols!',
    inputMinlength = 'You cannot enter less than 3 characters!',
    symbolsRange =  "Please use only letters, numbers, single whitespaces and the symbols  ‘ – '",
}

export interface Errors {
    errors: {[key: string]: string};
}
export interface User {
      email: string;
      token: string;
      username: string;
      consultantCvId: number;
      dateOfBirth?: Date | string;
      bio: string;
      image: string;
      userId: number;
      languageName: string;
      companyId: number;
      companyName: string;
      tokenValidTo: string;
      isUserSuperAdmin: boolean;
      isUserLocalAdmin: boolean;
      isUserGlobalAdmin?: boolean;
      has2FAuthEnabled: boolean;
      adminLevel: number | null;
}

export enum ChangePassword {
      title = 'New password is needed',
      login = 'Login',
      currentPassword = 'Current password',
      newPassword =  "New password",
      confirmPassword =  "Confirm new password",
      confirmButton = "Confirm",
      cancelButton = "Cancel"
}
