import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AccommodationService} from '../../services/accommodation.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'accomm',
  templateUrl: './accommodation-main.component.html',
  styleUrls: ['./accommodation-main.component.css'],
})

export class AccommodationMainComponent {

  constructor(private router: Router) {
    
  }
}