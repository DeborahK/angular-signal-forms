import { applyWhenValue, min, minLength, required, schema } from "@angular/forms/signals";

// NULL HANDLING BEST PRACTICE:
// Use strings or numbers, not nulls
// If the domain model requires nullable types, define a separate domain model and form model
// Then map the form model values to the domain model before saving
// OR create a custom control that understands how to work with nullable values
export interface VehicleDomain {
  vehicleName: string;
  vehicleType: string;
  description: string | null;
  occupancy: number | null;
  manufactureDate: Date | null;
}

export interface Vehicle {
  vehicleName: string;
  vehicleType: string;
  description: string;
  occupancy: number;
  manufactureDate: Date | null; // null is the empty value for Date bound to <input type=date> 
}

export const initialData: Vehicle = {
  vehicleName: '',
  vehicleType: '',
  description: '',
  occupancy: NaN,
  manufactureDate: null
}

// With no nulls, applyWhenValue isn't needed in this case
// Could just use minLength
// Left here as an example
export const vehicleSchema = schema<Vehicle>(rootPath => {
  required(rootPath.vehicleName, { message: 'Vehicle name is required' });
  required(rootPath.vehicleType, { message: 'Vehicle type is required' });
  min(rootPath.occupancy, 0, { message: 'The occupancy can not be negative' });
  applyWhenValue(
    rootPath.description,
    (value) => value !== null,
    (descriptionPath) => {
      minLength(descriptionPath, 5, { message: 'The description must be at least 5 characters' });
    }
  );
});
