import { Injectable, EventEmitter } from '@angular/core';
import { Accommodation } from '../models/Accommodation';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ConfigurationManager } from './configuration-manager.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccommodationService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private accommodationsUrl = `http://${ConfigurationManager.Host}/api/Accommodations`;  // URL to web api
    public accommodationUpdatedEvent: EventEmitter < string >;
    
    constructor(private http: Http) { 
        
        this.accommodationUpdatedEvent = new EventEmitter < any > (); 
    }

    getAllAccommodations() : Promise<Accommodation[]> {
        const url = `${this.accommodationsUrl}?$filter=Approved eq true`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Accommodation[] )
                    .catch(this.handleError);
    }

    getAllUnapprovedAccommodations() : Promise<Accommodation[]> {
        const url = `${this.accommodationsUrl}?$filter=Approved eq false`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Accommodation[] )
                    .catch(this.handleError);
    }

    getAccommodations(id: number) : Promise<Accommodation[]> {
        const url = `${this.accommodationsUrl}?$top=3&$skip=${id}&$filter=Approved eq true`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Accommodation[] )
                    .catch(this.handleError);
    }

    getAccommodation(id: number): Promise<Accommodation> {
        const url = `${this.accommodationsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Accommodation)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.accommodationsUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(accommodation: Accommodation, file: File): Promise<Accommodation> {

        let formData: FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        
        if(file != null)   
        {
            formData.append('uploadFile', file, file.name);
        }
        
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        header.append('enctype', 'multipart/form-data');
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.accommodationsUrl, formData, options)
        .toPromise()
        .then(res => res.json() as Accommodation)
        .catch(this.handleError);
    }

    update(accommodation: Accommodation, file: File): Promise<Accommodation> {

        let formData: FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        
        if(file != null)   
        {
            formData.append('uploadFile', file, file.name);
        }

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        header.append('enctype', 'multipart/form-data');
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.accommodationsUrl}/${accommodation["Id"]}`;
        let myResponse = this.http
        .put(url, formData, options)
        .toPromise()
        .then(() => accommodation)
        .catch(this.handleError);
    
        //if(myResponse == ResponseType.)
        {
            //this.accommodationUpdatedEvent.emit();  
        }

        return myResponse;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    } 
}