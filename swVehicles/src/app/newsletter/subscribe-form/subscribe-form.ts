import { Component, computed, effect, signal } from '@angular/core';
import { form, Field, submit } from '@angular/forms/signals';
import { initialData, Subscription, subscriptionSchema } from '../subscription';

@Component({
  selector: 'swv-subscribe-form',
  imports: [Field],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.css',
})
export class SubscribeForm {
  subscribeMessage = signal('');
  errorMessage = signal('');

  // Create a form model signal with form fields
  // This represents the form's data structure
  subscribeModel = signal<Subscription>(initialData);
  fullName = computed(() => `${this.subscribeModel().firstName} ${this.subscribeModel().lastName}`);
  pageHeader = computed(() => `Subscribe to our Newsletter ${this.fullName()}`);

  // Declare a form from the model and logic rules schema
  subscribeForm = form(this.subscribeModel, subscriptionSchema);

  cancel() {
    // Reset form (or navigate to another page)
    this.resetForm();
  }

  subscribe() {
    this.subscribeMessage.set('');
    submit(this.subscribeForm, () =>
      this.onSubmit());
  }

  async onSubmit() {
    this.subscribeMessage.set(`Thank you for your subscription ${this.fullName()}!`);
    // Submit to the server
    console.log('Submitting data to server:', this.subscribeForm().value());
    // Reset form (or navigate to another page)
    this.resetForm();
  }

  resetForm() {
    // Reset the form
    this.subscribeForm().reset();
    // Reset to the initial model data
    this.subscribeModel.set(initialData);

  }

  eff = effect(() => {
    console.log('Email:', this.subscribeModel().email);
  });
}
