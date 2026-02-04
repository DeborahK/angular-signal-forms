import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { initialData, Vehicle, vehicleSchema } from '../vehicle';

@Component({
  selector: 'swv-vehicle-form',
  imports: [FormField],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {

  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<Vehicle>(initialData);

  // Declare a form from the model
  vehicleForm = form(this.vehicleModel, vehicleSchema);

}
