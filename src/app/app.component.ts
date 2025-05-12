import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthModule, RouterLink, RouterLinkActive, CommonModule],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass : AuthHttpInterceptor, multi:true
  }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  signedin$ : BehaviorSubject<boolean>;
  constructor(private authService : AuthService) {
    this.signedin$ = authService.signedin$;
  }
  ngOnInit(){
    this.authService.checkAuth().subscribe({});
  }
}
