import { Component, Inject, OnInit } from '@angular/core';
import { NxForm } from '../../../decorators/NxForm';
import { TugsService } from '../../../services/tugs.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface TugsFormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-tugs-form',
    templateUrl: './tugs-form.component.html',
    styleUrls: ['./tugs-form.component.styl']
})

@NxForm({
    serviceName: 'service',
    title: Tugs,
})

export class TugsFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AllowanceFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sb: MatSnackBar,
                private service: TugsService,
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
