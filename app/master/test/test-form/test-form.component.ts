import { Component, Inject, OnInit } from '@angular/core';
import { NxForm } from '../../../decorators/NxForm';
import { TestService } from '../../../services/test.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface TestFormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.styl']
})

@NxForm({
    serviceName: 'service',
    title: 'Hotel Maldives',
})

export class TestFormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AllowanceFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sb: MatSnackBar,
                private service: TestService,
                private fb: FormBuilder) {
    }

    ngOnInit() {

        this.form = this.fb.group({
         name: [null],
         age: [null, [Validators.required, Validators.email]],
         branch: [null],
         expired_at: [null],
         status: [null],
         remarks: [null],
        
        });

        if (this.data) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
        }
    }


}
