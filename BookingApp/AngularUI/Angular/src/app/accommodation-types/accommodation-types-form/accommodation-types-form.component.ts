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

  constructor(private accommTypesService: AccommodationTypesService,
  private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(accommtype: any, form: NgForm) {
      this.accommtype = new AccommodationType();
        this.accommtype.name = accommtype.Name;

      this.accommTypesService.create(this.accommtype);
      form.resetForm();
    }
}