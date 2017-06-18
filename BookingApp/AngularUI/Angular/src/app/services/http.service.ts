import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService{

    constructor (private http: Http){

    }

    click(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append("Accept", "text/plain");
        //headers.append("Access-Control-Allow-Origin", "*");
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.post("http://localhost:54042/api/WSClick", "", opts);
    }
}