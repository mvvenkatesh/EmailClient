import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { matchPasswordValidator } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authForm: FormGroup;
  constructor(private uniqueUsername: UniqueUsername, private authService: AuthService, private router : Router) {
    this.authForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          Validators.pattern(/^[a-z0-9]+$/)
        ], [this.uniqueUsername.validate]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ])
      }, { validators: matchPasswordValidator() });
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signUp(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (error: { status: any }) => {
        if (!error.status) {
          this.authForm.setErrors({
            ...(this.authForm.errors || {}),
            noConnection: true
          });
        }
        else{
          this.authForm.setErrors({
            ...(this.authForm.errors || {}),
            unknownError: true
          });
        }
      }
    });
  }
}