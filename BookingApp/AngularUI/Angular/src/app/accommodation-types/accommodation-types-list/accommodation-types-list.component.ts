import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccommodationTypesService} from '../../services/accommodation-types.service';
import {AccommodationType} from '../../models/AccommodationType';

@Component({
  selector: 'accomm-types-list',
  templateUrl: './accommodation-types-list.component.html',
  styleUrls: ['./accommodation-types-list.component.css'],
})

export class AccommodationTypesListComponent implements OnInit {

  accommtypes: AccommodationType[];

  constructor(private accommTypesService:AccommodationTypesService,
  private router: Router) {
    
  }

  getAccomTypes() : void {
    this.accommTypesService.getAccommodationTypes()
      .then(accommtypes => this.accommtypes = accommtypes);
  }

  ngOnInit() : void {
    this.getAccomTypes();
  }

}