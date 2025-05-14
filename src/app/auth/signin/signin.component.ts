import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  authForm: FormGroup;
  constructor(private authService: AuthService,private router : Router) {
    this.authForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
      ])
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next : () => {
        this.router.navigateByUrl('/inbox');
      },
      error : ({error}) =>{
        if(error.username || error.password){
          this.authForm.setErrors({credentials : true});
        }
      }
    });
  }
}
