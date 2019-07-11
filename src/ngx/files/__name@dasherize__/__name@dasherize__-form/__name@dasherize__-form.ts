import { Component, Inject, OnInit } from '@angular/core';
import { NxForm } from '../../../decorators/NxForm';
import { <%=uppercaseFirst(name)%>Service } from '../../../services/<%=dasherize(name)%>.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface <%=uppercaseFirst(name)%>FormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-<%=dasherize(name)%>-form',
    templateUrl: './<%=dasherize(name)%>-form.component.html',
    styleUrls: ['./<%=dasherize(name)%>-form.component.styl']
})

@NxForm({
    serviceName: 'service',
    title: <%=uppercaseFirst(name)%>,
})

export class <%=uppercaseFirst(name)%>FormComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AllowanceFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sb: MatSnackBar,
                private service: <%=uppercaseFirst(name)%>Service,
                private fb: FormBuilder) {
    }

    ngOnInit() {

        this.form = this.fb.group({
        <% for(let field of model.fields) { %> <%= field.name  %>: [<%= field.value ? field.value : 'null' %><%= makeValidators(field.validates) %>],
        <% }%>
        });

        if (this.data) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
        }
    }


}
