import { Component } from '@angular/core';
import { VehicleForm } from './vehicles/vehicle-form/vehicle-form';

@Component({
  selector: 'swv-root',
  imports: [VehicleForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  pageTitle = 'Star Wars Vehicle Sales';
}
