import { applyWhen, email, max, min, minLength, required, schema, validate } from "@angular/forms/signals";

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
  phoneNumber(rootPath.phone);
  applyWhen(
    rootPath.phone,
    ({ valueOf }) => valueOf(rootPath.sendViaText) === true,
    (phonePath) => {
      required(phonePath, { message: 'Your cell phone number is required to receive our newsletter' }),
      minLength(phonePath, 10, { message: 'Minimum of 10 digits is required' })
    }
  );
  validate(rootPath.sendViaEmail, ({ value, valueOf }) => {
    // const viaEmail = value();
    // const viaText = valueOf(rootPath.sendViaText);
    // if (viaEmail || viaText) return null;
    if (value() || valueOf(rootPath.sendViaText)) return null;
    return {
      kind: 'sendViaMissing',
      message: 'Must select to send via Email or Text or both'
    };
  });
  min(rootPath.yearsAsFan, 0, { message: 'Years cannot be negative' });
  max(rootPath.yearsAsFan, 100, { message: 'Please enter a valid number of years' });
});

function phoneNumber(field: any, options?: { message?: string }) {
  validate(field, ({ value }) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
    if (value() && !phoneRegex.test(value() as string)) {
      return {
        kind: 'phoneNumber',
        message: 'Please enter a valid phone number of the form: 111-555-1212'
      }
    }
    return null
  })
}
