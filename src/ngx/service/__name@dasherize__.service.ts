import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDataService } from '../decorators/NxDataService';

export interface <%=classify(name)%>Service extends NxDataService<any> {
    test;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '<%=model.api%>'
})

export class <%=classify(name)%>Service {

    constructor(public http: HttpClient) {
    }
}
