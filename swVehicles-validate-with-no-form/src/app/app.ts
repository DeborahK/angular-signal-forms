import { Component, signal } from '@angular/core';
import { UserImport } from './user-import/user-import';

@Component({
  selector: 'swv-root',
  imports: [UserImport],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('swVehicles-no-form');
}
