import { Component, OnInit, Input } from '@angular/core';
import {MapInfo} from './map-info.model'
import {Accommodation} from '../models/Accommodation';
import {AccommodationService} from '../services/accommodation.service';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 300px; width: 500px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {
  //@Input() mapInfo: MapInfo

  defaultInfo : MapInfo;
  accomodationsMapInfo: MapInfo[];
  accomodations : Accommodation[];

  constructor(private accommodationService: AccommodationService) { 
      this.defaultInfo = new MapInfo(45.242268, 
                                    19.842954, 
                                    "assets/ftn.png",
                                    "Jugodrvo" , 
                                    "" , 
                                    "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  }

  private getAccommodations() : void {
        this.accommodationService.getAccommodations().then(accommodations => this.accomodations = accommodations);
  }      
  
  private doMapping() : void {
        for(let accommodation of this.accomodations) {
            var mapInfo : MapInfo;
            
            debugger
            mapInfo = new MapInfo(accommodation.latitude,
                                  accommodation.longitude,
                                  "assets/ftn.png",
                                  "Jugodrvo" , 
                                  "" , 
                                  "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

            this.accomodationsMapInfo.push(mapInfo);                    
            debugger  
        }
  }

  ngOnInit() : void {
        this.getAccommodations();
        this.doMapping();
  }
}
