import { Component, OnInit } from '@angular/core';
import { NxBaseFunctions } from '../../decorators/NxBaseFunctions';
import { BankFormComponent } from './bank-form/bank-form.component';
import { BankService } from '../../services/bank.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export interface BankComponent extends NxBaseFunctions {
    test;
}

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.styl']
})

@NxBaseFunctions({
    serviceName: 'service',
    title: Bank,
    formComponent: BankFormComponent,
})

export class BankComponent implements OnInit {

    displayedColumns = ["name", "age", "branch", "branch", "remarks_blala", "actions"];

    constructor(private dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sb: MatSnackBar,
                private service: BankService) {
    }

    ngOnInit() {
    }

}
