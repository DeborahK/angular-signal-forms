import { email, max, min, minLength, required, schema } from "@angular/forms/signals";

export interface Subscription {
  email: string;
  firstName: string;
  lastName: string;
  yearsAsFan: number;
}

export const initialData = {
  email: '',
  firstName: '',
  lastName: '',
  yearsAsFan: NaN
};

// Define the validation as part of the model
export const subscriptionSchema = schema<Subscription>((path) => {
  required(path.email, { message: 'Your email address is required to receive our newsletter' });
  email(path.email, { message: 'Please enter a a valid email address'});
  minLength(path.email, 6, {message: 'The email must be at least 6 characters long'});
  min(path.yearsAsFan, 0, { message: 'Years cannot be negative' });
  max(path.yearsAsFan, 100, { message: 'Please enter a valid number of years' });
})
