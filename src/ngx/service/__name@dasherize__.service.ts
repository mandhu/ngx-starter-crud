import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDataService } from '../decorators/NxDataService';

export interface <%=uppercaseFirst(name)%>Service extends NxDataService<any> {
    test;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '<%=model.api%>'
})

export class <%=uppercaseFirst(name)%>Service {

    constructor(public http: HttpClient) {
    }
}
