import { Injectable, inject } from '@angular/core';
import { AccountingApiService } from './accounting-api.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from 'src/app/app.config';


@Injectable({
  providedIn: 'root'
})
export class AccountingUserService {

  public alertTimer: any;


  private accountingApiService = inject(AccountingApiService);
  private currentAccountingUserSubject = new BehaviorSubject({} as User);

  getAccountingUser() {
    return this.accountingApiService.get('/user').pipe(
      map(user => user.user),
      tap(user => {
        this.currentAccountingUserSubject.next(user);
      })
    );
  };

  getCurrentAccountingUser() {
    return this.currentAccountingUserSubject.getValue();
  }
}
