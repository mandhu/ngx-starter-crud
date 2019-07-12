import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDataService } from '../decorators/NxDataService';

export interface TestBestService extends NxDataService<any> {
    test;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '/api/hotel'
})

export class TestBestService {

    constructor(public http: HttpClient) {
    }
}
