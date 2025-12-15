import { apply, applyWhen, email, max, min, minLength, required, schema, validate } from "@angular/forms/signals";

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
  required(rootPath.email, {
    message: 'Your email address is required to receive our newsletter',
    when: ({ valueOf }) => valueOf(rootPath.sendViaEmail) === true
  });
  email(rootPath.email, { message: 'Please enter a valid email address' });
  minLength(rootPath.email, 6, { message: 'The email must be at least 6 characters long' });
  applyWhen(
    rootPath.phone,
    ({ valueOf }) => valueOf(rootPath.sendViaText) === true,
    phoneSchema
  );
  // Cross field validation: Invalidate one of the fields
  validate(rootPath.sendViaText, (ctx) => {
    const viaText = ctx.value();
    const viaEmail = ctx.valueOf(rootPath.sendViaEmail);
    if (viaEmail || viaText) return null;
    return {
      kind: 'sendViaMissing',
      message: 'Must select to send via Email or Text or both'
    };
  });
  apply(rootPath.yearsAsFan, yearsAsFanSchema);
});

const yearsAsFanSchema = schema<number>((path) => [
  min(path, 0, { message: 'Years cannot be negative' }),
  max(path, 100, { message: 'Please enter a valid number of years' }),
]);

const phoneSchema = schema<string>((path) => [
  required(path, { message: 'Your cell phone number is required to receive our newsletter' }),
  minLength(path, 10, { message: 'Minimum of 10 digits is required' })
]);

