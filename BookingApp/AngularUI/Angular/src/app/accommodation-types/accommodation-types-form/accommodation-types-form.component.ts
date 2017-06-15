import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AccommodationType } from '../../models/AccommodationType';
import {NgForm} from '@angular/forms';

import {AccommodationTypesService} from '../../services/accommodation-types.service';

@Component({
  selector: 'accomm-types-form',
  templateUrl: './accommodation-types-form.component.html',
  styleUrls: ['./accommodation-types-form.component.css'],
})

export class AccommodationTypesFormComponent implements OnInit {

  accommtype: AccommodationType;
  uriParts: string [];
  isUpdate: boolean;
  temp: any;

  constructor(private accommTypesService: AccommodationTypesService,
  private router: Router) {
      this.accommtype = new AccommodationType();
      this.accommtype.name = '';
  }

  ngOnInit(): void {
    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 1] === 'update'){
      this.isUpdate = true;
      
      this.temp = JSON.parse(localStorage.getItem('updateAccommodation'));
      this.accommtype.id = this.temp.id;
      this.accommtype.name = this.temp.name;
    }
    else{
      this.isUpdate = false;

      this.accommtype.name = '';
    }
  }

  onSubmit(accommtype: any, form: NgForm) {
      this.accommtype = new AccommodationType();
        this.accommtype.name = accommtype.Name;

      if(!this.isUpdate){
          this.accommTypesService.create(this.accommtype);
      }
      else{
          this.accommTypesService.update(this.accommtype);
      }

      form.resetForm();
    }
}