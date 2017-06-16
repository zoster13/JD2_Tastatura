import {Injectable} from '@angular/core';
import {Place} from '../models/Place';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlacesService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private placesUrl = 'http://localhost:54042/api/Places';  // URL to web api

    constructor(private http: Http) { }

    getPlaces() : Promise<Place[]> {
        return this.http.get(this.placesUrl)
                    .toPromise()
                    .then(response => response.json() as Place[])
                    .catch(this.handleError);
    }

    getPlace(id: number): Promise<Place> {
        const url = `${this.placesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Place)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.placesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(place: Place): Promise<Place> {
        return this.http
        .post(this.placesUrl, JSON.stringify(place), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Place)
        .catch(this.handleError);
    }

    update(place: Place): Promise<Place> {
        const url = `${this.placesUrl}/${place["Id"]}`;
        return this.http
        .put(url, JSON.stringify(place), {headers: this.headers})
        .toPromise()
        .then(() => place)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}