import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { initialData, VehicleFormData, vehicleSchema } from '../vehicle';

@Component({
  selector: 'swv-vehicle-form',
  imports: [FormField],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {

  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<VehicleFormData>(initialData);

  // Declare a form from the model and logic rules schema
  vehicleForm = form(this.vehicleModel, vehicleSchema);

}
