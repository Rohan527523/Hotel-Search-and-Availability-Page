import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../hotel.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzCardModule, NzButtonModule, NzSpinModule],
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnChanges {
  @Input() searchParams: any;
  hotels: any[] = [];
  locationName: string = '';
  isLoading: boolean = false;
  // Pagination Variables
  totalHotels: number = 0;

  constructor(private hotelService: HotelService) {}

  ngOnChanges() {
    if (this.searchParams) {
      this.fetchHotels();
    }
  }

  fetchHotels() {
    this.isLoading = true;
    const params = {
      ...this.searchParams,
    };
    this.hotelService.getHotels(params).subscribe(response => {
      this.locationName = response.message.locationName;
      this.hotels = response.message.hotels || [];
      this.totalHotels = response.message.total || 0;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching hotels:', error);
      this.isLoading = false;
    });
  }
}
