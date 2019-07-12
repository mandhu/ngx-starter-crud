import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { TestBestFormComponent } from './test-best-form/test-best-form.component';
import { TestBestService } from '../../services/test-best.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface TestBestComponent extends NxBaseFunctions {
    test;
}

@Component({
    selector: 'app-test-best',
    templateUrl: './test-best.component.html',
    styleUrls: ['./test-best.component.styl']
})

@NxBaseFunctions({
    serviceName: 'service',
    title: 'Hotel Maldives',
    formComponent: TestBestFormComponent,
})

export class TestBestComponent implements OnInit {

    displayedColumns = ["name", "age", "branch", "expired_at", "status", "remarks", "actions"];

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: TestBestService) {
    }

    ngOnInit() {
    }

}
