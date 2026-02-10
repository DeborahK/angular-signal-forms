import { minLength, required, schema } from "@angular/forms/signals";

// Optional Properties BEST PRACTICE:
// Use strings or numbers, not optional properties or undefined
// If the domain model requires optional properties, define a separate domain model and form model
// Then map the form model values to the domain model before saving

export interface VehicleDomain {
  vehicleName: string;
  vehicleType: string;
  description?: string;
}

export interface Vehicle {
  vehicleName: string;
  vehicleType: string;
  description: string;
}

export const initialData: Vehicle = {
  vehicleName: '',
  vehicleType: '',
  description: ''
}

export const vehicleSchema = schema<Vehicle>(rootPath => {
  required(rootPath.vehicleName, { message: 'Vehicle name is required' });
  required(rootPath.vehicleType, { message: 'Vehicle type is required' });
  minLength(rootPath.description, 5, { message: 'The description must be at least 5 characters' });
});
