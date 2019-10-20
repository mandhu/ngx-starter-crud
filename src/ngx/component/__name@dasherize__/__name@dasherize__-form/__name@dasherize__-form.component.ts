import { Component, Inject, OnInit } from '@angular/core';
import { NxForm } from '../../../decorators/NxForm';
import { <%=classify(name)%>Service } from '../../../services/<%=dasherize(name)%>.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


export interface <%=classify(name)%>FormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-<%=dasherize(name)%>-form',
    templateUrl: './<%=dasherize(name)%>-form.component.html',
    styleUrls: ['./<%=dasherize(name)%>-form.component.styl']
})

@NxForm({
    serviceName: 'service',
    title: '<%=title(name, model)%>',
})

export class <%=classify(name)%>FormComponent implements OnInit {

    form: FormGroup;
    <%= autoCompleteArrays(model.fields) %>

    constructor(public dialogRef: MatDialogRef<<%=classify(name)%>FormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private sb: MatSnackBar,
                private service: <%=classify(name)%>Service,
                private fb: FormBuilder) {
    }

    ngOnInit() {

        this.form = this.fb.group({
        <% for(let field of model.fields) { %> <%=   '\t\t'+field.name  %>: [<%= field.value ? field.value : 'null' %><%= makeValidators(field.validates) %>],
        <% }%>
        });

        if (this.data) {
            if (this.data.id) {
                this.form.addControl('id', new FormControl(this.data.id));
            }
            <%=autoCompletePatchValue(model.fields) %>
            this.form.patchValue(this.data);
        }
        <% for(let field of model.fields) { %> <%= field.htmlType == 'select-auto' ? renderAutoCompleteHandler(field) : '' %><% }%>
    }


}
