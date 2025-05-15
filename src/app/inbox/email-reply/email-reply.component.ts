import { Component, Input, input, Output } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ModalComponent } from "../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from "../email-form/email-form.component";
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector : 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css',
  imports: [ModalComponent, CommonModule, EmailFormComponent]
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email! : Email;

  constructor(private emailService : EmailService){}

  ngOnChanges(){
    this.email = {
      ...this.email,
      from : this.email.to,
      to : this.email.from,
      subject : `RE: ${this.email.subject}`,
      text : `\n\n\n------${this.email.from} wrote:\n${this.email.text}`
    }
  }

  onSubmit(email : Email){
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false;
    });
  }

}
