import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

interface UserNameAvailableResponse{
  available : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username : username
    })
     
  }
}
