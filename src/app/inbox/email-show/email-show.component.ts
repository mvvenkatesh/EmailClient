import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { CommonModule } from '@angular/common';
import { EmailReplyComponent } from '../email-reply/email-reply.component';

@Component({
  selector: 'app-email-show',
  imports: [CommonModule, EmailReplyComponent],
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css'
})
export class EmailShowComponent {
  email: Email;

  constructor(private route: ActivatedRoute, private emailService: EmailService) { 
    this.email = route.snapshot.data['email'];
    this.route.data.subscribe(({email})=>{
      this.email = email;
    });
  }

  ngOnInit() {
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email) => {
    //   this.email = email;
    // });
  }
}
