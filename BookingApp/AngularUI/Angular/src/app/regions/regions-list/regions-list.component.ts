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

    this.subscribeForRegionEvent();
  }

  delete(id: number){ 
    this.regionsService.delete(id)
    .then( x => { this.regionsService.getRegions().then(x => this.regions = x);});
  }

  private subscribeForRegionEvent () {
    this.regionsService.regionEvent.subscribe(e => this.onRegionEvent(e));
  }

  public onRegionEvent(message : string) {
    alert(message);              
  }
}