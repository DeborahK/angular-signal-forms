import { email, max, min, minLength, required, schema } from "@angular/forms/signals";

export interface Subscription {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  sendViaText: boolean;
  sendViaEmail: boolean;
  yearsAsFan: number;
}

export const initialData: Subscription = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  sendViaText: true,
  sendViaEmail: true,
  yearsAsFan: NaN
};

// Define the validation as part of the model
export const subscriptionSchema = schema<Subscription>((rootPath) => {
  required(rootPath.email, { message: 'Your email address is required to receive our newsletter' });
  email(rootPath.email, { message: 'Please enter a valid email address' });
  required(rootPath.phone, { message: 'Your cell phone number is required to receive our newsletter' });
  minLength(rootPath.email, 6, { message: 'The email must be at least 6 characters long' });
  min(rootPath.yearsAsFan, 0, { message: 'Years cannot be negative' });
  max(rootPath.yearsAsFan, 100, { message: 'Please enter a valid number of years' });
});
