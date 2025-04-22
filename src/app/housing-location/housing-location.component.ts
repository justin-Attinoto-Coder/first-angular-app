import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="housingLocation">
      <h3>{{ housingLocation.name }}</h3>
      <p>{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <img
        [src]="housingLocation.photo || 'https://via.placeholder.com/300'"
        alt="{{ housingLocation.name }}"
        [attr.loading]="isLCP ? 'eager' : 'lazy'"
        (error)="logImageError(housingLocation.name)"
      />
      <p>Units available: {{ housingLocation.availableUnits }}</p>
      <p class="wifi">Wifi: {{ housingLocation.wifi ? 'Yes' : 'No' }}</p>
      <p class="laundry">Laundry: {{ housingLocation.laundry ? 'Yes' : 'No' }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </div>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  @Input() isLCP: boolean = false;

  logImageError(name: string): void {
    console.error(`Image failed to load for ${name}`);
  }
}