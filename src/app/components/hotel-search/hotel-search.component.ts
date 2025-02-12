import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HotelService } from '../../hotel.service';
import { HotelListComponent } from "../hotel-list/hotel-list.component";
@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzSelectModule,
    HotelListComponent
],
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  searchForm!: FormGroup;
  checkinDate = new Date();
  checkoutDate = new Date();
  nightsCount = 1;
  roomsList = [1, 2, 3, 4];
  guestsList = [1, 2, 3, 4];
  
  constructor(private fb: FormBuilder, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.checkoutDate.setDate(this.checkinDate.getDate() + this.nightsCount);

    this.searchForm = this.fb.group({
      location: [null, Validators.required],
      checkin_date: [this.checkinDate, Validators.required],
      checkout_date: [this.checkoutDate, Validators.required],
      rooms_guests: [null, Validators.required],
      guests: [null, Validators.required]
    });

    this.searchForm.valueChanges.subscribe(values => {
      this.nightsCount = this.calculateNights(values.checkin_date, values.checkout_date);
    });
  }

  calculateNights(checkin: Date, checkout: Date): number {
    if (!checkin || !checkout) return 1;
    return Math.max((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24), 1);
  }


  searchParams: any = null; // Holds the search data
  onSearch(): void {
    const formValues = this.searchForm.value;
  
    // Convert Date to "DD-MM-YYYY" format
    const checkin_date = this.formatDate(formValues.checkin_date);
    const checkout_date = this.formatDate(formValues.checkout_date);
  
    this.searchParams = {
      location: formValues.location,
      checkin_date,
      checkout_date,
      rooms: formValues.rooms_guests,
      guests: formValues.guests,
    };
  }
  
  // Utility function to format Date to "DD-MM-YYYY"
  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  }
}
