import { Model } from "../models/Model";
import { SchematicsException } from '@angular-devkit/schematics';

export function uppercaseFirst(name: string) {
    return name.replace(/\w+/g, function(txt) {
        // uppercase first letter and add rest unchanged
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, '');
}

export function capitalizeEachWord(str: string) {
    let frags = str.split('_');
    for (let i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }

    return frags.join(' ');
}

export function placeholder(field: any) {
    return field.placeholder ? field.placeholder : capitalizeEachWord(field.name);
}


export function modelFieldsToArray(model: Model) {
    let fields: any[] = [];

    model.fields.map((field, index) => {
        fields.push(`${index == 0 ? "": " "}"${field.name}"`);
    });

    return `[${fields}, "actions"]`;
}

export function makeValidators(validates: any) {

    if (!validates) return;

    if(!Array.isArray(validates)) {
        throw new SchematicsException('validates must be an array. Idiot!');
    }

    if(validates.length) {
        let string = ', ';

        if (validates.length == 1) {
            string += `Validators.${validates[0]}`
        }

        if(validates.length > 1) {
            string += '[';
            validates.map((rule, index, array) =>{
                string += `Validators.${rule}${(index == (array.length -1)) ? '' : ', ' }`
            });
            string += ']';
        }

        return string;
    }
}

export function renderField(field: any) {
    switch (field.htmlType) {
        case 'text':
        case 'number':
            return input(field);
        case 'date':
            return date(field);
        case 'textarea':
            return textarea(field);
        case 'select':
            return select(field);
    }
}

function input(field: any) {
    return `<input matInput type="${field.htmlType}" placeholder="${placeholder(field)}" formControlName="${field.name}">`;
}

function date(field: any) {
    return `<input matInput [matDatepicker]="picker${field.name}" placeholder="${placeholder(field)}" formControlName="${field.name}">
        <mat-datepicker-toggle matSuffix [for]="picker${field.name}"></mat-datepicker-toggle>
        <mat-datepicker #picker${field.name}></mat-datepicker>`
}

function textarea(field: any) {
    return `<textarea matInput placeholder="${placeholder(field)}" formControlName="${field.name}"></textarea>`;
}

function select(field: any) {
    return `<mat-label>${placeholder(field)}</mat-label>
        <mat-select formControlName="${field.name}">
            ${options(field.options)}
        </mat-select>`;
}

function options(options: any) {
    if (Array.isArray(options) && options.length) {
        let string = '';

        options.map((op, index, arr) => {
            for(const [key, value] of Object.entries(op)) {
                string += `<mat-option value="${key}">${value}</mat-option>${(index == arr.length - 1) ? '': '\n\t\t\t' }`
            }

        });

        return string;
    }

    return `<mat-option value="key">value</mat-option>`
}
