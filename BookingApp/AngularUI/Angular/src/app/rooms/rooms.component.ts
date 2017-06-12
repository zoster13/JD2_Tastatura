import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { RoomsService } from '../services/rooms.service';
import 'rxjs/add/operator/switchMap';

import {Room} from '../models/Room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})

export class RoomsComponent {

    rooms: Room[];

    constructor(
      private roomsService: RoomsService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

  ngOnInit(): void {
    this.getRooms();  
  }

  getRooms() : void {
    this.roomsService.getRooms().then(rooms => this.rooms = rooms);
    //debugger
  }

  goBack(): void {
    this.location.back();
  }
}