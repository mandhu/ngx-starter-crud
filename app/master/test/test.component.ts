import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { TestFormComponent } from './test-form/test-form.component';
import { TestService } from '../../services/test.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface TestComponent extends NxBaseFunctions {
    test;
}

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.styl']
})

@NxBaseFunctions({
    serviceName: 'service',
    title: 'Hotel Maldives',
    formComponent: TestFormComponent,
})

export class TestComponent implements OnInit {

    displayedColumns = ["name", "age", "branch", "expired_at", "status", "remarks", "actions"];

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: TestService) {
    }

    ngOnInit() {
    }

}
