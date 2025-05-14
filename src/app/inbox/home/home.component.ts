import { Component } from '@angular/core';
import { EmailIndexComponent } from "../email-index/email-index.component";
import { PlaceholderComponent } from "../placeholder/placeholder.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [EmailIndexComponent, PlaceholderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
