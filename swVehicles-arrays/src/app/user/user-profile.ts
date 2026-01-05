import { applyEach, required, schema, SchemaPathTree, validate } from "@angular/forms/signals";

export interface UserProfile {
  firstName: string;
  lastName: string;
  socialLinks: string[]
}

export const initialData: UserProfile = {
  firstName: '',
  lastName: '',
  socialLinks: []
}

// Apply a single validator
// export const userProfileSchema = schema<UserProfile>(rootPath => {
//   required(rootPath.firstName, { message: 'First name is required' });
//   applyEach(rootPath.socialLinks, url)
// });

// Apply a set of validators
export const userProfileSchema = schema<UserProfile>(rootPath => {
  required(rootPath.firstName, { message: 'First name is required' });
  applyEach(rootPath.socialLinks, linksSchema)
});

// To provide a custom error message
// export const userProfileSchema = schema<UserProfile>(rootPath => {
//   required(rootPath.firstName, { message: 'First name is required' });
//   applyEach(rootPath.socialLinks, (path) => url(path, { message: 'Custom'}))
// });

// Reusable custom url validator
function url(field: SchemaPathTree<string>, options?: { message?: string }) {
  validate(field, ({ value }) => {
    try {
      // Use the URL constructor to determine if the value is a valid url
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Please enter a valid URL',
      };
    }
  });
}

// Define the set of validation rules for the array items
const linksSchema = schema<string>((link) => {
  required(link, {message: 'Once added, the social link is required'});
  url(link);
});
