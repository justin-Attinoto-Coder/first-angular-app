import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter (input)="filterResults(filter.value)" />
        <select #filterType (change)="filterResults(filter.value)">
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="state">State</option>
        </select>
        <select #sortField (change)="filterResults(filter.value)">
          <option value="name">Name</option>
          <option value="availableUnits">Available Units</option>
        </select>
        <select #sortDirection (change)="filterResults(filter.value)">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList; let i = index"
        [housingLocation]="housingLocation"
        [isLCP]="i === 0"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterType: 'city' | 'name' | 'state' = 'city';
  sortField: 'name' | 'availableUnits' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    const filterTypeElement = document.querySelector('#filterType') as HTMLSelectElement;
    const sortFieldElement = document.querySelector('#sortField') as HTMLSelectElement;
    const sortDirectionElement = document.querySelector('#sortDirection') as HTMLSelectElement;
    this.filterType = (filterTypeElement?.value as 'city' | 'name' | 'state') || 'city';
    this.sortField = (sortFieldElement?.value as 'name' | 'availableUnits') || 'name';
    this.sortDirection = (sortDirectionElement?.value as 'asc' | 'desc') || 'asc';

    if (!text) {
      this.filteredLocationList = [...this.housingLocationList];
    } else {
      this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
        if (this.filterType === 'city') {
          return housingLocation.city.toLowerCase().includes(text.toLowerCase());
        } else if (this.filterType === 'name') {
          return housingLocation.name.toLowerCase().includes(text.toLowerCase());
        } else if (this.filterType === 'state') {
          return housingLocation.state.toLowerCase().includes(text.toLowerCase());
        }
        return false;
      });
    }

    this.filteredLocationList.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;
      if (this.sortField === 'name') {
        valueA = a.name;
        valueB = b.name;
      } else {
        valueA = a.availableUnits;
        valueB = b.availableUnits;
      }
      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }
}