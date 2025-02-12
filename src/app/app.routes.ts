import { Routes } from '@angular/router';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';

export const routes: Routes = [
    { path: '', component: HotelSearchComponent },
];
