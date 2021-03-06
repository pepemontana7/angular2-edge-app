import {Injectable} from '@angular/core'
import {ApiService} from './api.service'

@Injectable()
export class DataService {
    constructor(
        private _api: ApiService
    ) {}
    
    public rooms: any;
    public users: any;

    getAllData() {
        return Promise.all([this.getRooms(), this.getUsers()])
    }
    
    getRooms() {
        return new Promise((resolve, reject) => {
            this._api.send('getRooms').subscribe(
                res => {
                    this.rooms = res.data;
                    resolve(res)
                }, 
                err => reject(err)
            )
        })
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this._api.send('getUsers').subscribe(
                res => {
                    this.users = res.data;
                    resolve(res)
                },
                err => reject(err)
            )
        })
    }
}