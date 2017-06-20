import {Injectable} from '@angular/core';
import {Comment} from '../models/Comment';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommentsService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private commentsUrl = 'http://localhost:54042/api/Comments';  // URL to web api

    constructor(private http: Http) { }

    getAllComments() : Promise<Comment[]> {
        return this.http.get(this.commentsUrl)
                    .toPromise()
                    .then(response => response.json() as Comment[])
                    .catch(this.handleError);
    }

    getComments(id: number): Promise<Comment[]> {
        const url = `${this.commentsUrl}/?$filter=Accommodation/Id eq ${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Comment[])
            .catch(this.handleError);
    }

    getComment(id: number): Promise<Comment> {
        const url = `${this.commentsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Comment)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.commentsUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(comment: Comment): Promise<Comment> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.commentsUrl, JSON.stringify(comment), options)
        .toPromise()
        .then(res => res.json() as Comment)
        .catch(this.handleError);
    }

    update(comment: Comment): Promise<Comment> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.commentsUrl}/${comment.id}`;
        return this.http
        .put(url, JSON.stringify(comment), options)
        .toPromise()
        .then(() => comment)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}