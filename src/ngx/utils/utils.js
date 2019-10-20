"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function isRequired(array, key) {
    if (!array) {
        return '';
    }
    return array.includes(key) ? 'required' : '';
}
exports.isRequired = isRequired;
function removeLetters(word, syb = '_', index = 0) {
    if (!word)
        return '';
    const arr = word.split(syb);
    return arr[index];
}
exports.removeLetters = removeLetters;
function uppercaseFirst(name) {
    return name.replace(/\w+/g, function (txt) {
        // uppercase first letter and add rest unchanged
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, '');
}
exports.uppercaseFirst = uppercaseFirst;
function capitalizeEachWord(str) {
    let frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}
exports.capitalizeEachWord = capitalizeEachWord;
function placeholder(field) {
    return field.placeholder ? field.placeholder : capitalizeEachWord(field.name);
}
exports.placeholder = placeholder;
function title(name, model) {
    return model.title ? model.title : uppercaseFirst(name);
}
exports.title = title;
function modelFieldsToArray(model) {
    let fields = [];
    model.fields.map((field, index) => {
        fields.push(`${index == 0 ? '' : ' '}'${field.name}'`);
    });
    return `[${fields}, 'actions']`;
}
exports.modelFieldsToArray = modelFieldsToArray;
function makeValidators(validates) {
    if (!validates)
        return;
    if (!Array.isArray(validates)) {
        throw new schematics_1.SchematicsException('validates must be an array.!');
    }
    if (validates.length) {
        let string = ', ';
        if (validates.length == 1) {
            string += `Validators.${validates[0]}`;
        }
        if (validates.length > 1) {
            string += '[';
            validates.map((rule, index, array) => {
                string += `Validators.${rule}${(index == (array.length - 1)) ? '' : ', '}`;
            });
            string += ']';
        }
        return string;
    }
}
exports.makeValidators = makeValidators;
function autoCompleteArrays(fields) {
    let arrays = '';
    fields.forEach(field => {
        if (field.htmlType == 'select-auto') {
            arrays += removeLetters(field.name) + 's :any[] = [];';
        }
    });
    return arrays;
}
exports.autoCompleteArrays = autoCompleteArrays;
function renderAutoCompleteHandler(field) {
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
exports.renderAutoCompleteHandler = renderAutoCompleteHandler;
function autoCompletePatchValue(fields) {
    let render = '';
    fields.forEach(field => {
        if (field.htmlType == 'select-auto') {
            render += `if (this.data.${field.name}) {
                this.${removeLetters(field.name)}s.push(this.data.${removeLetters(field.name)});
            } \n`;
        }
    });
    return render;
}
exports.autoCompletePatchValue = autoCompletePatchValue;
function renderField(field) {
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
exports.renderField = renderField;
function input(field) {
    return `<input matInput type="${field.htmlType}" placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>`;
}
function date(field) {
    return `<input matInput [matDatepicker]="picker${field.name}" placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
        <mat-datepicker-toggle matSuffix [for]="picker${field.name}"></mat-datepicker-toggle>
        <mat-datepicker #picker${field.name}></mat-datepicker>`;
}
function textarea(field) {
    return `<textarea matInput placeholder="${placeholder(field)}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}></textarea>`;
}
function select(field) {
    return `<mat-label>${placeholder(field)}</mat-label>
        <mat-select formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
            ${options(field.options)}
        </mat-select>`;
}
function options(options) {
    if (Array.isArray(options) && options.length) {
        let string = '';
        options.map((op, index, arr) => {
            for (const [key, value] of Object.entries(op)) {
                string += `<mat-option value="${key}">${value}</mat-option>${(index == arr.length - 1) ? '' : '\n\t\t\t\t\t\t'}`;
            }
        });
        return string;
    }
    return `<mat-option value="key">value</mat-option>`;
}
function selectAuto(field) {
    return `<mat-select placeholder="Select ${capitalizeEachWord(removeLetters(field.name))}" formControlName="${field.name}" ${isRequired(field.validates, 'required')}>
            <mat-option>
                <ngx-mat-select-search placeholderLabel="Select ${placeholder(field)}" formControlName="${removeLetters(field.name)}"></ngx-mat-select-search>
            </mat-option>
            <mat-option *ngFor="let ${removeLetters(field.name)} of ${removeLetters(field.name)}s" [value]="${removeLetters(field.name)}.id">
                {{${removeLetters(field.name)}}}
            </mat-option>
        </mat-select>`;
}
function renderValidatorError(field) {
    if (!field.validates || !field.validates.length)
        return;
    if (field.htmlType == 'select-auto') {
        return `
        <mat-error>
            ${capitalizeEachWord(removeLetters(field.name))} is <strong>required</strong>
        </mat-error>`;
    }
    return `
        <mat-error>
            ${placeholder(field)} is <strong>required</strong>
        </mat-error>`;
}
exports.renderValidatorError = renderValidatorError;
//# sourceMappingURL=utils.js.map