import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, InputComponent,ReactiveFormsModule,ModalComponent
  ],
  exports: [
    InputComponent, ModalComponent
  ]
})
export class SharedModule { }
