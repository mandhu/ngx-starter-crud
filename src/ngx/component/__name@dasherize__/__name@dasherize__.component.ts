import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { <%=classify(name)%>FormComponent } from './<%=dasherize(name)%>-form/<%=dasherize(name)%>-form.component';
import { <%=classify(name)%>Service } from '../../services/<%=dasherize(name)%>.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface <%=classify(name)%>Component extends NxBaseFunctions {
    test;
}

@Component({
    selector: 'app-<%=dasherize(name)%>',
    templateUrl: './<%=dasherize(name)%>.component.html',
    styleUrls: ['./<%=dasherize(name)%>.component.styl']
})

@NxBaseFunctions({
    serviceName: 'service',
    title: '<%=title(name, model)%>',
    formComponent: <%=classify(name)%>FormComponent,
})

export class <%=classify(name)%>Component implements OnInit {

    displayedColumns = <%= modelFieldsToArray(model) %>;

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: <%=classify(name)%>Service) {
    }

    ngOnInit() {
    }

}
