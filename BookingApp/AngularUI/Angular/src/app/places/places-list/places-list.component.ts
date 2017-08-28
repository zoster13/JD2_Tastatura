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
    this.subscribeForPlaceEvent();
  }

  delete(id: number){
    this.placesService.delete(id)
    .then( x => { this.placesService.getPlaces().then(x => this.places = x);});
  }

  private subscribeForPlaceEvent () {
    this.placesService.placeEvent.subscribe(e => this.onPlaceEvent(e));
  }

  public onPlaceEvent(message : string) {
    alert(message);              
  }
}