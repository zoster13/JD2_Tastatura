import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {AccommodationService} from '../../services/accommodation.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Accommodation} from '../../models/Accommodation';
import {AccommodationFilterPipe} from '../../search/search.component';

@Component({
  selector: 'accomm-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})

export class AccommodationListComponent implements OnInit {
  role: string;

  accommodations: Accommodation[];
  accomm: Accommodation;
  temp: any;
  accommcount: number;
  numeration: any[] = [];
  i: number = 0;

  constructor(private accommodationService:AccommodationService,
              private router: Router,
              private routeActive: ActivatedRoute,
              private location: Location,
              private authenticationService: AuthenticationService) {
              
              }


  getAccommodations() : void {
    this.accommodationService.getAllAccommodations()
      .then(accommodations =>{ 
        this.accommcount = accommodations.length;
      if(this.accommcount%3 == 0){
          for(this.i = 0;this.i < Math.floor(this.accommcount/3); this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
      else{
          for(this.i = 0; this.i <  Math.floor(this.accommcount/3) + 1; this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
    });
  }

  ngOnInit() : void {

    if(this.isLoggedIn()){
        this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
    }
    
    this.getAccommodations();

    this.routeActive.params
        .switchMap((params: Params) => this.accommodationService.getAccommodations(((+params['id'])-1)*3))
        .subscribe(country => {this.accommodations = country;});
  }

  delete(id: number) {
    this.accommodationService.delete(id);
    window.location.reload();
  }

  isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
  }
}