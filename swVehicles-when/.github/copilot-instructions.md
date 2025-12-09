# Copilot Instructions: swVehicles (Angular Signals Demo)

## Project Overview
Angular 21 demo application showcasing **modern Signals-based reactive patterns** for forms and state management. Star Wars vehicle sales app with signal-driven forms, HTTP resources, and reactive computations.

## Architecture Patterns

### Signals-First Reactive State
- **NO RxJS Observables in components** - use Angular Signals exclusively
- Services expose `signal()` or `computed()` - never Observables
- Example: `VehicleService.selectedVehicle = signal<Vehicle | undefined>(undefined)`
- Components read signals directly: `vehicle = this.vehicleService.selectedVehicle`

### HTTP Data Fetching
Two distinct patterns based on complexity:
1. **Simple HTTP**: Use `httpResource()` for straightforward GET requests
   ```typescript
   vehiclesResource = httpResource<Vehicle[]>(() => this.url, {defaultValue: []});
   // Access: vehiclesResource.value(), vehiclesResource.isLoading(), vehiclesResource.error()
   ```
2. **Complex HTTP**: Use `rxResource()` when combining multiple requests or transforming data
   ```typescript
   vehicleFilmsResource = rxResource({
     params: this.vehicleService.selectedVehicle,
     stream: p => forkJoin(p.params.films.map(link => this.http.get<Film>(link))),
     defaultValue: []
   });
   ```

### Signal Forms Pattern (`@angular/forms/signals`)
- Define model interface + initial data + validation schema separately
- Example in `newsletter/subscription.ts`:
  ```typescript
  subscribeModel = signal<Subscription>(initialData);
  subscribeForm = form(this.subscribeModel, subscriptionSchema);
  // Schema uses: required(), email(), minLength(), min(), max()
  ```
- Bind fields with `[field]="subscribeForm.firstName"` directive
- Submit with `submit(this.subscribeForm, () => this.onSubmit())`

### Computed Signals for Derived State
Heavily used for reactive calculations without manual subscriptions:
```typescript
// CartService example - auto-updates when dependencies change
subTotal = computed(() => this.quantity() * this.price());
deliveryFee = computed(() => this.subTotal() < 100000 ? 999 : 0);
totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());
```

### linkedSignal for Dependent Resets
Use `linkedSignal()` when a signal should reset/recalculate when source changes:
```typescript
quantity = linkedSignal({
  source: this.vehicleService.selectedVehicle,
  computation: v => 1  // Resets to 1 whenever vehicle changes
});
```

## File Organization

### Component Structure (No @Component Decorator)
- Standalone components: `imports: [...]` instead of modules
- Co-located files: `component-name.ts`, `component-name.html`, `component-name.css`
- Selector prefix: `swv-` for app-level, `sw-` for features
- Template/style paths: `templateUrl: './component-name.html'`

### Service Patterns
- All services: `@Injectable({ providedIn: 'root' })`
- No manual providers array needed
- Use `inject()` function: `private vehicleService = inject(VehicleService)`

### Shell Components
Master-detail pattern in `vehicle-shell/vehicle-shell.ts` - inline template composing child components:
```typescript
template: `
  <div class='shell'>
    <div class='list-container'><sw-vehicle-list/></div>
    <div class='detail-container'><sw-vehicle-detail/></div>
    <div class='total-container'><sw-cart-total/></div>
  </div>
`
```

## Template Conventions

### Control Flow Syntax (No *ngIf/*ngFor)
Modern built-in control flow:
```html
@if (isLoading()) {
  <div class="loading">... Loading</div>
} @else if (errorMessage()) {
  <div class="alert alert-danger">{{errorMessage()}}</div>
} @else {
  @for(vehicle of vehicles(); track vehicle) {
    <option [ngValue]="vehicle">{{vehicle.name}}</option>
  }
}
```
Note: Signals used in templates **require parentheses** - `vehicles()` not `vehicles`

### Two-Way Binding
`[(ngModel)]="selectedVehicle"` binds directly to signals

## Development Workflow

### Dev Server
```bash
npm start  # Runs ng serve on http://localhost:4200
```
- In-memory API adds 1000ms delay to simulate network latency
- Check console for signal effects logging data/errors

### Testing
```bash
npm test  # Vitest runner (not Karma)
```

### Build
```bash
npm run build        # Production build
npm run watch        # Development build with watch mode
```

## Mock Data Setup
- Uses `angular-in-memory-web-api` for fake backend
- Data defined in `app-data.ts` implementing `InMemoryDbService`
- Configured in `app.config.ts` with `{ delay: 1000, passThruUnknownUrl: true }`
- API endpoints: `api/vehicles`, `api/films`

## Routing
- Lazy loading: `loadComponent: () => import('./path').then(c => c.ComponentName)`
- Routes in `app.routes.ts` - NO NgModule needed
- See `subscribe-form` and `vehicle-shell` routes for examples

## Code Style
- Prettier configured: 100 char width, single quotes, Angular HTML parser
- TypeScript: Strict mode enabled with `noImplicitReturns`, `noFallthroughCasesInSwitch`
- Angular strict templates and injection parameters enforced
