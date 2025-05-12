import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {

  constructor(private authService: AuthService,
    private router: Router
  ) { 
    this.authService.signOut().subscribe(() => {

    });
    this.router.navigateByUrl("/");
  }

  ngOnInit() {
    
  }

}
