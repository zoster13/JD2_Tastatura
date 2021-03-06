import { Injectable, EventEmitter } from '@angular/core';
import { AccommodationType } from '../models/AccommodationType';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ConfigurationManager } from './configuration-manager.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccommodationTypesService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private accommodationTypesUrl = `http://${ConfigurationManager.Host}/api/AccommodationTypes`;  // URL to web api
    public accommodationTypeEvent: EventEmitter < any >;
    
    constructor(private http: Http) { 
        
        this.accommodationTypeEvent = new EventEmitter<any>();
    }

    getAccommodationTypes() : Promise<AccommodationType[]> {        
        return this.http.get(this.accommodationTypesUrl)
                    .toPromise()
                    .then(response => response.json() as AccommodationType[])
                    .catch(this.handleError);
    }

    getAccommodationType(id: number): Promise<AccommodationType> {
        const url = `${this.accommodationTypesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as AccommodationType)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.accommodationTypesUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(accommodationType: AccommodationType): Promise<AccommodationType> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        //this.accommodationTypeEvent.emit("AccommodationType is successfully created.");

        return this.http
        .post(this.accommodationTypesUrl, JSON.stringify(accommodationType), options)
        .toPromise()
        .then(res => res.json() as AccommodationType)
        .catch(this.handleError);
    }

    update(accommodationType: AccommodationType): Promise<AccommodationType> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        //this.accommodationTypeEvent.emit("AccommodationType is successfully modified.");

        const url = `${this.accommodationTypesUrl}/${accommodationType["Id"]}`;
        
        return this.http
        .put(url, JSON.stringify(accommodationType), options)
        .toPromise()
        .then(() => accommodationType)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}