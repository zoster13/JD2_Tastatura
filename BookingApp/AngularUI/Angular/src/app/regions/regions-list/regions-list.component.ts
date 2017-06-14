import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegionsService} from '../../services/regions.service';
import {Region} from '../../models/Region';

@Component({
  selector: 'accomm',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})

export class RegionsListComponent implements OnInit {

  regions: Region[];

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

}