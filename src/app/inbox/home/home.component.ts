import { Component } from '@angular/core';
import { EmailIndexComponent } from "../email-index/email-index.component";
import { PlaceholderComponent } from "../placeholder/placeholder.component";
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EmailCreateComponent } from "../email-create/email-create.component";

@Component({
  selector: 'app-home',
  imports: [EmailIndexComponent, SharedModule, RouterOutlet, EmailCreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
