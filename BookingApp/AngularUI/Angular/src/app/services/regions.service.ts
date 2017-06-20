import {Injectable} from '@angular/core';
import {Region} from '../models/Region';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegionsService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private regionsUrl = 'http://localhost:54042/api/Regions';  // URL to web api

    constructor(private http: Http) { }

    getRegions() : Promise<Region[]> {
        return this.http.get(this.regionsUrl)
                    .toPromise()
                    .then(response => response.json() as Region[])
                    .catch(this.handleError);
    }

    getRegion(id: number): Promise<Region> {
        const url = `${this.regionsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Region)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.regionsUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(region: Region): Promise<Region> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.regionsUrl, JSON.stringify(region), options)
        .toPromise()
        .then(res => res.json() as Region)
        .catch(this.handleError);
    }

    update(region: Region): Promise<Region> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.regionsUrl}/${region["Id"]}`;
        return this.http
        .put(url, JSON.stringify(region), options)
        .toPromise()
        .then(() => region)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}