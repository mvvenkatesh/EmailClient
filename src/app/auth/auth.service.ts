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
interface SigninResponse{
  username : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username = '';
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
      tap((response) => {
        this.signedin$.next(true);
        this.username = response.username;
      }
      ));
  }
  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {
      withCredentials: true
    }).pipe(
      tap(({ authenticated,username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
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
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`,credentials , {
      withCredentials: true
    }).pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }
}
