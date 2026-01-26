import { Component, signal } from '@angular/core';
import { initialData, UserProfile, userProfileSchema } from './user-profile';
import { form } from '@angular/forms/signals';
import { userArray } from './user-import-data';

@Component({
  selector: 'swv-user-import',
  imports: [],
  templateUrl: './user-import.html'
})
export class UserImport {

  importMessages = signal<ImportMessage[]>([]);

  // Create a form model signal with form fields
  // This represents the form's data structure
  userProfileModel = signal<UserProfile>(initialData);

  // Declare a form from the model and logic rules schema
  userProfileForm = form(this.userProfileModel, userProfileSchema);

  importUsers(): void {
    this.importMessages.set([]);

    // Import the data (this uses hard-coded data)
    userArray.forEach(user => {
      // Assign the data to the model
      this.userProfileModel.set(user)

      // Create an output string to log the import process
      const errors = this.userProfileForm().errorSummary;
      const importMessage: ImportMessage = {
        header: `${user.firstName} ${user.lastName} has ${errors.length} errors`,
        errors: errors().flatMap(e => e.message ? [e.message] : [])
      };
      this.importMessages.update(msgs => [...msgs, importMessage])
    });
  }
}

export interface ImportMessage {
  header: string;
  errors: string[];
}