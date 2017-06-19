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

  delete(id: number){ 
    this.regionsService.delete(id);
    window.location.reload();
  }
}