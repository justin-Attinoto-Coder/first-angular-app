import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'https://first-angular-app-backend.onrender.com/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      if (!data.ok) throw new Error(`Fetch failed with status ${data.status}`);
      return (await data.json()) ?? [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    try {
      const data = await fetch(`${this.url}?id=${id}`);
      if (!data.ok) throw new Error(`Fetch failed with status ${data.status}`);
      const locationJson = await data.json();
      return locationJson[0] ?? undefined;
    } catch (error) {
      console.error('Error fetching location by ID:', error);
      return undefined;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}