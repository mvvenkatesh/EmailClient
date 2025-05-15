import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from "../email-form/email-form.component";
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css',
  imports: [SharedModule, CommonModule, EmailFormComponent]
})
export class EmailCreateComponent {
  showModal = false;
  email : Email;
  constructor(private authService : AuthService, private emailService : EmailService){
    this.email = {
      id : '',
      to: '',
      subject: '',
      html : '',
      text : '',
      from : `${authService.username}@angular-email.com`
    };
  }
  onSubmit(email : Email){
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false;
    });
  }
}
