import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationTypesService} from '../../services/accommodation-types.service';
import { AccommodationType} from '../../models/AccommodationType';

@Component({
  selector: 'accomm-types-list',
  templateUrl: './accommodation-types-list.component.html',
  styleUrls: ['./accommodation-types-list.component.css'],
})

export class AccommodationTypesListComponent implements OnInit {

  accommtypes: AccommodationType[];
  accommtype: AccommodationType;
  temp: any;

  constructor(private accommTypesService:AccommodationTypesService,
              private _ngZone: NgZone,
              private router: Router) {
    
  }

  getAccomTypes() : void {
    this.accommTypesService.getAccommodationTypes()
      .then(accommtypes => this.accommtypes = accommtypes);
  }

  ngOnInit() : void {
    this.getAccomTypes();
    this.subscribeForAccommodationTypeCreate();
  }

  delete(id: number){ 
    this.accommTypesService.delete(id)
      .then( x => { this.accommTypesService.getAccommodationTypes().then(x => this.accommtypes = x);});
  }

  private subscribeForAccommodationTypeCreate () {
    this.accommTypesService.accommodationTypeEvent.subscribe(e => this.onAccommodationTypeEvent(e));
  }

  public onAccommodationTypeEvent(message : string) {
    alert(message);              
  }
}