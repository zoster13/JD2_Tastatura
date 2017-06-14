import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AccommodationService} from '../../services/accommodation.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'regions',
  templateUrl: './regions-main.component.html',
  styleUrls: ['./regions-main.component.css'],
})

export class RegionsMainComponent {

  constructor(private router: Router) {
    
  }
}