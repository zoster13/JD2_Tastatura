import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegionsService} from '../../services/regions.service';
import {Region} from '../../models/Region';

@Component({
  selector: 'regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.css'],
})

export class RegionsListComponent implements OnInit {

  regions: Region[];
  region: Region;
  temp: any;

  constructor(private regionsService:RegionsService,
  private router: Router) {
    
  }

  getRegions() : void {
    this.regionsService.getRegions()
      .then(regions => this.regions = regions);
  }

  ngOnInit() : void {
    this.getRegions();
  }

  update(regionId: number){
    this.region = new Region();
    for(var i = 0; i < this.regions.length; i++){
      this.temp = this.regions[i];
      if(this.temp.Id == regionId){
          break;
      }
    }
    localStorage.setItem('updateRegion', JSON.stringify({ id: this.temp.Id, 
                    name: this.temp.Name}));
  }

}