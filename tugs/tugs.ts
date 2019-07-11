import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { TugsFormComponent } from './tugs-form/tugs-form.component';
import { TugsService } from '../../services/tugs.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface tugsComponent extends NxBaseFunctions {
    test;
}

@Component({
    selector: 'app-tugs',
    templateUrl: './tugs.component.html',
    styleUrls: ['./tugs.component.styl']
})

@NxBaseFunctions({
    serviceName: 'service',
    title: Tugs,
    formComponent: TugsFormComponent,
})

export class TugsComponent implements OnInit {

    displayedColumns = ['name', 'actions'];

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: TugsService) {
    }

    ngOnInit() {
    }

}
