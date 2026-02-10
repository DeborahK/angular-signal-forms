import { Component, effect, signal } from '@angular/core';
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

  // Declare a form from the model and logic rules schema
  vehicleForm = form(this.vehicleModel, vehicleSchema);

  // Log model and form fields
  eff = effect(() => {
    console.log('--- MODEL ---')
    console.log('vehicleName value', this.vehicleModel().vehicleName);
    console.log('vehicleType value', this.vehicleModel().vehicleType);
    console.log('description value', this.vehicleModel().description);
    console.log('--- FORM (FieldTree) ---')
    console.log('vehicleName is found?', !!this.vehicleForm.vehicleName);
    console.log('vehicleType is found?', !!this.vehicleForm.vehicleType);
    console.log('description is found?', !!this.vehicleForm.description);
  });

}
