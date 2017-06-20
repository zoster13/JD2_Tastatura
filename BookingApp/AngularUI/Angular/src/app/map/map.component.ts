import { Component, OnInit, Input } from '@angular/core';
import {MapInfo} from './map-info.model'
import {Accommodation} from '../models/Accommodation';
import {AccommodationService} from '../services/accommodation.service';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 625px; width: 900px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  defaultInfo : MapInfo;
  accomodationsMapInfo: MapInfo[] = [];
  accomodations : Accommodation[] = [];

  constructor(private accommodationService: AccommodationService) { 
      
      this.defaultInfo = new MapInfo(45.242268, 
                                    19.842954, 
                                    "assets/ftn.png",
                                    "Jugodrvo" , 
                                    "" , 
                                    "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  }

  private getAccommodations() : void {
        this.accommodationService.getAllAccommodations().then(accommodations => {this.accomodations = accommodations; 
                                                                              this.doMapping();});
      }      

  private doMapping() : void {
        
        debugger
        for(let accommodation of this.accomodations) {
            var mapInfo : MapInfo;
            
            mapInfo = new MapInfo(accommodation["Latitude"],
                                  accommodation["Longitude"],
                                  "assets/ftn.png",
                                  accommodation["Name"], 
                                  accommodation["Description"] , 
                                  "");

            this.accomodationsMapInfo.push(mapInfo);
        }
  }

  ngOnInit() : void {
        this.getAccommodations();
  }
}
