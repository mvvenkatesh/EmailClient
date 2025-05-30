import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-form',
  imports: [ReactiveFormsModule, SharedModule,CommonModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {
  emailForm!: FormGroup;
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();

  ngOnInit() {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to,[
        Validators.required, Validators.email
      ]),
      from : new FormControl({value:from,disabled:true}),
      subject : new FormControl(subject,[
        Validators.required
      ]),
      text : new FormControl(text,[
        Validators.required
      ])
    }
    );
  }
  onSubmit(){
    if(this.emailForm.invalid){
      return;
    }
    this.emailSubmit.emit(this.emailForm.value);
  }
}
