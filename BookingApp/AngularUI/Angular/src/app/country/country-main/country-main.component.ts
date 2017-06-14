import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'country-main',
  templateUrl: './country-main.component.html',
  styleUrls: ['./country-main.component.css'],
})

export class CountryMainComponent {

  constructor(private router: Router) {
    
  }
}