import {Injectable} from '@angular/core';
import {Country} from '../models/Country';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountriesService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private countriesUrl = 'http://localhost:54042/api/Countries';  // URL to web api

    constructor(private http: Http) { }

    getAllCountries() : Promise<Country[]> {
        return this.http.get(this.countriesUrl)
                    .toPromise()
                    .then(response => response.json() as Country[])
                    .catch(this.handleError);
    }

    getCountries(id: number) : Promise<Country[]> {
        const url = `${this.countriesUrl}/?$top=5&$skip=${id}`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Country[])
                    .catch(this.handleError);
    }

    getCountry(id: number): Promise<Country> {
        const url = `${this.countriesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Country)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.countriesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(country: Country): Promise<Country> {
        return this.http
        .post(this.countriesUrl, JSON.stringify(country), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Country)
        .catch(this.handleError);
    }

    update(country: Country): Promise<Country> {
        debugger
        const url = `${this.countriesUrl}/${country["Id"]}`;
        return this.http
        .put(url, JSON.stringify(country), {headers: this.headers})
        .toPromise()
        .then(() => country)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}