import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../../app.config';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public authTimeout: any;
  public alertTimer: any;
  private currentUserSubject = new BehaviorSubject<User>({} as User);

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => {
          this.setAuth(data.user);
        },
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    //calculate token validity time for auto logout
    const expirationTime = new Date(user.tokenValidTo).getTime() - Date.now();
    if (expirationTime < 0) {
      this.purgeAuth();
    } else {
      this.alertTimer = setTimeout(
        () => alert('5 minutes left before logout'),
        expirationTime - 300000
      );
      //Set auto logout timer
      this.authTimeout = setTimeout(() => {
        this.purgeAuth();
        this.router.navigate(['/login']);
      }, expirationTime);
      // Save JWT sent from server in localstorage
      this.jwtService.saveToken(user.token);
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticatedSubject.next(true);
    }
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // Stop auth timeout
    if (this.authTimeout != null) {
      clearTimeout(this.authTimeout);
    }
  }


  attemptAuth(type: string, credentials: any): Observable<User> {
    console.log('type a', type);
    console.log('credentials a', credentials);
    const route = type === 'login' ? '/login' : '';

    return this.apiService.nonJSONPost('/users' + route, { user: { ...credentials }}).pipe(
      tap((data:any) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<User> {
    return this.apiService.put('/user', user).pipe(
      map((data:any) => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  generate2FactorAuth(data: any, retry: boolean) {
    return this.apiService.put('/user/generate2FactorAuth', data, retry);
  }

  disable2FactorAuth(credentials: any) {
    return this.apiService.put('/user/Disable2FactorAuth', credentials);
  }
  verify2FactorAuth(code: any) {
    return this.apiService.put('/user/Verify2FactorAuth', code);
  }
  check2FactorAuth(email: string) {
    return this.apiService.get('/users/Check2Factor/' + email);
  }

  activateUser(user: string){
    return this.apiService.put('/user/activate/' + user);
  }

  setNewCredentials(credentials: any) {
    return this.apiService.patch('/users/NewPasswordRequired', credentials);
  }

  getCurrentUserInitials() {
    const user = this.currentUserSubject.getValue();
    const userName = user.username.split(' ');
    console.log(userName);
    let initials = '';
    userName.forEach(name => {
      initials += name[0].toUpperCase();
    });

    return initials;
  }
}
