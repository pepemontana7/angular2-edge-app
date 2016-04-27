import {Injectable} from 'angular2/core';
import {Http, Headers, RequestMethod, Request} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {UserStoreService} from './userStore.service';
import {urlValues} from '../config/app.values';

@Injectable()
export class ApiService {
    constructor (
        private http: Http,
        private _userStoreService: UserStoreService
    ) {}

    private _url: any = urlValues;

    send(name, item?, id?) {

        let url: string,
            type: any,
            body: any,
            authHeader: boolean = true;

        // Set the right url using the provided name
        switch (name) {

            // Login
            case 'login':
                url = this._url.login;
                type = RequestMethod.Post;
                authHeader = false;
                break;
        }

        // Define the options for the request
        let options = {
            method: type,
            url: url,
            body: null,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        // If the passed item is a string use it
        // Otherwise json stringify it
        if (item) {
            body = typeof item === 'string' ? item : JSON.stringify(item);
            options.body = body;
        }

        // If authHeader is true we need to append the token to the header
        if (authHeader) options.headers.append('Authorization', 'Bearer ' + this._userStoreService.getUser().token);

        return this.http.request(new Request(options))
            .map(res => res.json())
            .catch(this.logError);
    }

    private logError (error: Error) {
        return Observable.throw(error);
    }
}