import {Injectable} from '@angular/core';
import {Accommodation} from '../models/Accommodation';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccommodationService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private accommodationsUrl = 'http://localhost:54042/api/Accommodations';  // URL to web api

    constructor(private http: Http) { }

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

    create(accommodation: Accommodation): Promise<Accommodation> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.accommodationsUrl, JSON.stringify(accommodation), options)
        .toPromise()
        .then(res => res.json() as Accommodation)
        .catch(this.handleError);
    }

    update(accommodation: Accommodation): Promise<Accommodation> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.accommodationsUrl}/${accommodation["Id"]}`;
        return this.http
        .put(url, JSON.stringify(accommodation), options)
        .toPromise()
        .then(() => accommodation)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    } 
}