import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
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
              private routeActive: ActivatedRoute,
              private router: Router) {
                  
      this.accommtype = new AccommodationType();
      this.accommtype.Name = '';
  }

  ngOnInit(): void {
    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'update'){
      this.isUpdate = true;

        this.routeActive.params
        .switchMap((params: Params) => this.accommTypesService.getAccommodationType(+params['id']))
        .subscribe(accommtype => this.accommtype = accommtype);
    }
    else{
      this.isUpdate = false;

      this.accommtype.Name = '';
    }
  }

  onSubmit(accommtype: any, form: NgForm) {
      
      if(accommtype.Name == "" || accommtype.Name == undefined) {
        
        alert("All fields must be filled!");
      }
      else {
        this.accommtype.Name = accommtype.Name;

        if(!this.isUpdate) {
            this.accommTypesService.create(this.accommtype);
            form.resetForm();
        }
        else {
            this.accommTypesService.update(this.accommtype);
        }
      }
    }
}