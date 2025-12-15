import { applyWhen, email, max, min, minLength, PathKind, required, schema, SchemaPath, SchemaPathTree, validate, validateTree } from "@angular/forms/signals";

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
    (phonePath) => {
      required(phonePath, { message: 'Your cell phone number is required to receive our newsletter' }),
        minLength(phonePath, 10, { message: 'Minimum of 10 digits is required' })
    }
  );
  // Cross field validation: Invalidate one of the fields
  validate(rootPath.sendViaEmail, (ctx) => {
    const viaEmail = ctx.value();
    const viaText = ctx.valueOf(rootPath.sendViaText);
    if (viaEmail || viaText) return null;
    return {
      kind: 'sendViaMissing',
      message: 'Must select to send via Email or Text or both'
    };
  });
  // validateSendVia(rootPath);
  min(rootPath.yearsAsFan, 0, { message: 'Years cannot be negative' });
  max(rootPath.yearsAsFan, 100, { message: 'Please enter a valid number of years' });
});

// Cross field validation using validateTree
// Included for reference
// Prefer `validate()` over `validateTree()` for performance reasons
function validateSendVia(basePath: SchemaPathTree<Subscription, PathKind.Root>) {
  validateTree(basePath, (ctx) => {
    const viaEmail = ctx.valueOf(basePath.sendViaEmail);
    const viaText = ctx.valueOf(basePath.sendViaText);
    if (viaEmail || viaText) return null;
    return [
      {
        field: ctx.field.sendViaEmail,
        kind: 'sendViaMissing',
        message: 'Must select to send via Email or Text or both'
      },
      {
        field: ctx.field.sendViaText,
        kind: 'sendViaMissing',
        message: 'Must select to send via Email or Text or both'
      }
    ];
  })
}