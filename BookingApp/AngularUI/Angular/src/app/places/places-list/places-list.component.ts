import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PlacesService} from '../../services/places.service';
import {Place} from '../../models/Place';

@Component({
  selector: 'places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css'],
})

export class PlacesListComponent implements OnInit {

  places: Place[];
  place: Place;
  temp: any;

  constructor(private placesService:PlacesService,
  private router: Router) {
    
  }

  getPlaces() : void {
    this.placesService.getPlaces()
      .then(places => this.places = places);
  }

  ngOnInit() : void {
    this.getPlaces();
  }
}