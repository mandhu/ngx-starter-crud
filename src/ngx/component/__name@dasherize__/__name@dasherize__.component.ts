import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { <%=uppercaseFirst(name)%>FormComponent } from './<%=dasherize(name)%>-form/<%=dasherize(name)%>-form.component';
import { <%=uppercaseFirst(name)%>Service } from '../../services/<%=dasherize(name)%>.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface <%=uppercaseFirst(name)%>Component extends NxBaseFunctions {
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
    formComponent: <%=uppercaseFirst(name)%>FormComponent,
})

export class <%=uppercaseFirst(name)%>Component implements OnInit {

    displayedColumns = <%= modelFieldsToArray(model) %>;

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: <%=uppercaseFirst(name)%>Service) {
    }

    ngOnInit() {
    }

}
