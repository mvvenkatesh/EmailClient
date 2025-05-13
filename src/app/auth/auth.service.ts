import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

interface UserNameAvailableResponse {
  available: boolean;
}

interface SignupCredentails {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials{
  username : string;
  password : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username: username
    })
  }
  signUp(credentials: SignupCredentails) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.signedin$.next(true);
      }
      ));
  }
  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {
      withCredentials: true
    }).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      })
    );
  }
  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }
  signin(credentials : SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`,credentials , {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
}
