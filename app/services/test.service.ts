import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDataService } from '../decorators/NxDataService';

export interface TestService extends NxDataService<any> {
    test;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '/api/hotel'
})

export class TestService {

    constructor(public http: HttpClient) {
    }
}
