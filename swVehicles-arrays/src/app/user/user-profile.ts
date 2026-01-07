import { applyEach, required, schema, SchemaPathTree, validate } from "@angular/forms/signals";

export interface UserProfile {
  firstName: string;
  lastName: string;
  socialLinks: string[];
}

export const initialData: UserProfile = {
  firstName: '',
  lastName: '',
  socialLinks: []
}

// Apply a single validator
export const userProfileSchema1 = schema<UserProfile>(rootPath => {
  required(rootPath.firstName, { message: 'First name is required' });
  applyEach(rootPath.socialLinks, url)
});

// Apply a set of validators
export const userProfileSchema = schema<UserProfile>(rootPath => {
  required(rootPath.firstName, { message: 'First name is required' });
  applyEach(rootPath.socialLinks, (path) => {
    required(path, { message: 'If added, the social link is required' });
    url(path, { message: 'The social link must be a valid URL' });
  })
});

// Apply a set of validators using a separate function
export const userProfileSchema3 = schema<UserProfile>(rootPath => {
  required(rootPath.socialLinks, { message: 'If added, the social link is required' });
  applyEach(rootPath.socialLinks, linksSchema)
});

// Reusable custom url validator
function url(field: SchemaPathTree<string>, options?: { message?: string }) {
  validate(field, (ctx) => {
    try {
      // Use the URL constructor to determine if the value is a valid url
      new URL(ctx.value());
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
  required(link, { message: 'If added, the social link is required' });
  url(link);
});
