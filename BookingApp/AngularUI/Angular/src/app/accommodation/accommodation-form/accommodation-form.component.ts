import { Component, OnInit, ChangeDetectorRef   } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Place } from '../../models/Place';
import { Room } from '../../models/Room';
import {AccommodationType} from '../../models/AccommodationType';
import {Accommodation} from '../../models/Accommodation';
import {AppUser} from '../../models/AppUser';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import {PlacesService} from '../../services/places.service';
import {AccommodationTypesService} from '../../services/accommodation-types.service';
import {AccommodationService} from '../../services/accommodation.service';
import {RoomsService} from '../../services/rooms.service';
import {AppUsersService} from '../../services/appuser.service';

@Component({
  selector: 'accomm-form',
  templateUrl: './accommodation-form.component.html',
  styleUrls: ['./accommodation-form.component.css'],
})

export class AccommodationFormComponent implements OnInit {

  fileSrcs: string[] = [];  
  image: any;

  places: Place[];
  accommTypes: AccommodationType [];
  users: AppUser [];
  accommodation: Accommodation;
  place: number;
  owners: AppUser[]

  uriParts: string [];
  isUpdate: boolean;
  temp: any;
;
  constructor(private placesService:PlacesService,
  private accommTypeService: AccommodationTypesService,
  private accomService: AccommodationService,
  private roomsService: RoomsService,
  private appUsersService: AppUsersService,
  private routeActive: ActivatedRoute,
  private router: Router,
  private changeDetectorRef: ChangeDetectorRef
  ) 
  {
    this.accommodation = new Accommodation();
    this.accommodation.rooms = [];
    this.accommodation.owner = new AppUser();
    this.accommodation.name = '';
    this.accommodation.description = '';
    this.accommodation.address = '';
    this.accommodation.longitude = 0;
    this.accommodation.latitude = 0;
    this.owners = [];
  }

  ngOnInit(): void {
    this.getPlaces();
    this.getAccommTypes();
    this.getAccommOwners();

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.accomService.getAccommodation(+params['id']))
        .subscribe(accomm => this.accommodation = accomm);
      this.isUpdate = true;
      
    //   this.temp = JSON.parse(localStorage.getItem('updateAccommodation'));
    //   this.accommodation.id = this.temp.id;
    //   this.accommodation.name = this.temp.name;
    //   this.accommodation.description = this.temp.description;
    //   this.accommodation.address = this.temp.address;
    //   this.accommodation.longitude = this.temp.longitude;
    //   this.accommodation.latitude = this.temp.latitude;
    //   this.accommodation.imageURL = this.temp.imageURL;
    //   this.fileSrcs = [];
    //   this.fileSrcs.push(this.accommodation.imageURL);
    }
    else{
      this.isUpdate = false;

      this.accommodation.name = '';
      this.accommodation.description = '';
      this.accommodation.address = '';
      this.accommodation.longitude = 0;
      this.accommodation.latitude = 0;
      this.fileSrcs = [];
    }
  }

  getPlaces() : void {
    this.placesService.getPlaces()
      .then(places => this.places = places);
  }

  getAccommTypes() : void {
    this.accommTypeService.getAccommodationTypes()
      .then(accommTypes => this.accommTypes = accommTypes);
  }

  getAccommOwners() : void {
    this.appUsersService.getAppUsers()
      .then(owners => this.owners = owners);
  }

  onSubmitAccomm(accomm: any, form: NgForm) {
      debugger
      this.accommodation.name = accomm.Name;
      this.accommodation.description = accomm.Description;  
      this.accommodation.address = accomm.Address;
      this.accommodation.longitude = accomm.Longitude;
      this.accommodation.latitude = accomm.Latitude;
      this.accommodation.place = new Place();
      this.accommodation.place.id = accomm.Place;
      this.accommodation.accommodationType = new AccommodationType();
      this.accommodation.accommodationType.id = accomm.AccommodationType;
      this.accommodation.owner = new AppUser();
      this.accommodation.owner.id = accomm.Owner;
      debugger

      if(!this.isUpdate){
          this.accomService.create(this.accommodation);
      }
      else{
          debugger
          this.accomService.update(this.accommodation);
      }
      
      form.resetForm();

      this.router.navigate(["mainpage/accommodation/accommlist"]);
    }

    fileChange(input) {  
      this.accommodation.imageURL = input.files[0].name;
      this.readFiles(input.files);  
    } 

    readFile(file, reader, callback) {  
        reader.onload = () => {  
            callback(reader.result);  
            this.image = reader.result;
            console.log(reader.result);  
        }  
        reader.readAsDataURL(file);  
    }  
    readFiles(files, index = 0) {  
       let reader = new FileReader();  
        // If there is a file  
        if (index in files) {  
            // Start reading this file  
            this.readFile(files[index], reader, (result) => {  
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");  
                img.src = result;  
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 250, 250, (resized_jpeg, before, after) => {  
                    // For debugging (size in bytes before and after)  
                    //this.debug_size_before.push(before);  
                    //this.debug_size_after.push(after);  
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    this.fileSrcs = [];
                    this.fileSrcs.push(resized_jpeg);  
                    // Read the next file;  
                    this.readFiles(files, index + 1);  
                });  
            });  
        } else {  
            // When all files are done This forces a change detection 
            this.changeDetectorRef.detectChanges();  
        }  
    }  
    resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {  
        // This will wait until the img is loaded before calling this function  
        return img.onload = () => {  
            // Get the images current width and height  
            var width = img.width;  
            var height = img.height;  
            // Set the WxH to fit the Max values (but maintain proportions)  
            if (width > height) {  
                if (width > MAX_WIDTH) {  
                    height *= MAX_WIDTH / width;  
                    width = MAX_WIDTH;  
                }  
            } else {  
                if (height > MAX_HEIGHT) {  
                    width *= MAX_HEIGHT / height;  
                    height = MAX_HEIGHT;  
                }  
            }  
            // create a canvas object  
            var canvas = document.createElement("canvas");  
            // Set the canvas to the new calculated dimensions  
            canvas.width = width;  
            canvas.height = height;  
            var ctx = canvas.getContext("2d");  
            ctx.drawImage(img, 0, 0, width, height);  
            // Get this encoded as a jpeg  
            // IMPORTANT: 'jpeg' NOT 'jpg'  
            var dataUrl = canvas.toDataURL('image/jpeg');  
            // callback with the results  
            callback(dataUrl, img.src.length, dataUrl.length);  
        };  
    }
}