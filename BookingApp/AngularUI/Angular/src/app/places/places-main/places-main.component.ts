import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'places',
  templateUrl: './places-main.component.html',
  styleUrls: ['./places-main.component.css'],
})

export class PlacesMainComponent {

  constructor(private router: Router) {
    
  }
}