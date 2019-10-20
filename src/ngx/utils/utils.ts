import { Model } from "../models/Model";
import { SchematicsException } from '@angular-devkit/schematics';

export function isRequired(array: string [], key: string) : string {
    if(!array) {
        return '';
    }
    return array.includes(key) ? 'required' : '';
}

export function removeLetters(word: string, syb: string = '_', index: number = 0): string {
    if(!word) return '';
    const arr = word.split(syb);
    return arr[index]
}

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


export function title(name: string, model: Model) {
    return model.title ? model.title : uppercaseFirst(name);
}

export function modelFieldsToArray(model: Model) {
    let fields: any[] = [];

    model.fields.map((field, index) => {
        fields.push(`${index == 0 ? '': ' '}'${field.name}'`);
    });

    return `[${fields}, 'actions']`;
}

export function makeValidators(validates: any) {

    if (!validates) return;

    if(!Array.isArray(validates)) {
        throw new SchematicsException('validates must be an array.!');
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

export function autoCompleteArrays(fields: any []): string {
    let arrays: string = '';
    fields.forEach(field => {
        if (field.htmlType == 'select-auto') {
            arrays+= removeLetters(field.name)+'s :any[] = [];'
        }
    });

    return arrays;
}

export function renderAutoCompleteHandler(field: any) {
    return `
        this.form.get('${removeLetters(field.name)}').valueChanges
            .pipe(
                debounceTime(300),
                startWith(null)
            )
            .subscribe(search => {
                if (search) {
                    this.${removeLetters(field.name)}Service.list({search}).subscribe(res => {
                        this.${removeLetters(field.name)}s = res.data.data;
                    });
                }
            })`;
}

export function autoCompletePatchValue(fields: any []) {
    let render: string = '';
    fields.forEach(field => {
        if (field.htmlType == 'select-auto') {
            render+= `if (this.data.${field.name}) {
                this.${removeLetters(field.name)}s.push(this.data.${removeLetters(field.name)});
            } \n`
        }
    });

    return render;
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
        case 'select-auto':
            return selectAuto(field);
    }
}

function input(field: any) {
    return `<input matInput type="${field.htmlType}" placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>`;
}

function date(field: any) {
    return `<input matInput [matDatepicker]="picker${field.name}" placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
        <mat-datepicker-toggle matSuffix [for]="picker${field.name}"></mat-datepicker-toggle>
        <mat-datepicker #picker${field.name}></mat-datepicker>`
}

function textarea(field: any) {
    return `<textarea matInput placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}></textarea>`;
}

function select(field: any) {
    return `<mat-label>${placeholder(field)}</mat-label>
        <mat-select formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
            ${options(field.options)}
        </mat-select>`;
}

function options(options: any) {
    if (Array.isArray(options) && options.length) {
        let string = '';

        options.map((op, index, arr) => {
            for(const [key, value] of Object.entries(op)) {
                string += `<mat-option value="${key}">${value}</mat-option>${(index == arr.length - 1) ? '': '\n\t\t\t\t\t\t' }`
            }
        });

        return string;
    }

    return `<mat-option value="key">value</mat-option>`
}

function selectAuto(field: any) {
    return `<mat-select placeholder="Select ${capitalizeEachWord(removeLetters(field.name))}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
            <mat-option>
                <ngx-mat-select-search placeholderLabel="Select ${placeholder(field)}" formControlName="${removeLetters(field.name)}"></ngx-mat-select-search>
            </mat-option>
            <mat-option *ngFor="let ${removeLetters(field.name)} of ${removeLetters(field.name)}s" [value]="${removeLetters(field.name)}.id">
                {{${removeLetters(field.name)}}}
            </mat-option>
        </mat-select>`;
}

export function renderValidatorError(field: any) {
    if(!field.validates || !field.validates.length) return;
    if (field.htmlType == 'select-auto') {
        return `
        <mat-error>
            ${capitalizeEachWord(removeLetters(field.name))} is <strong>required</strong>
        </mat-error>`;
    }

    return `
        <mat-error>
            ${placeholder(field)} is <strong>required</strong>
        </mat-error>`
}
