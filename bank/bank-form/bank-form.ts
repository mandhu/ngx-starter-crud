import { Component, Inject, OnInit } from '@angular/core';
import { NxForm } from '../../../decorators/NxForm';
import { BankService } from '../../../services/bank.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface BankFormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.styl']
})

@NxForm({
    serviceName: 'service',
    title: Bank,
})

export class BankFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AllowanceFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sb: MatSnackBar,
                private service: BankService,
                private fb: FormBuilder) {
    }

    ngOnInit() {

        this.form = this.fb.group({
            name: [null, Validators.required],
        });

        if (this.data) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
        }
    }


}
