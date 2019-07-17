"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
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
        fields.push(`${index == 0 ? "" : " "}"${field.name}"`);
    });
    return `[${fields}, "actions"]`;
}
exports.modelFieldsToArray = modelFieldsToArray;
function makeValidators(validates) {
    if (!validates)
        return;
    if (!Array.isArray(validates)) {
        throw new schematics_1.SchematicsException('validates must be an array. Idiot!');
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
    }
}
exports.renderField = renderField;
function input(field) {
    return `<input matInput type="${field.htmlType}" placeholder="${placeholder(field)}" formControlName="${field.name}">`;
}
function date(field) {
    return `<input matInput [matDatepicker]="picker${field.name}" placeholder="${placeholder(field)}" formControlName="${field.name}">
        <mat-datepicker-toggle matSuffix [for]="picker${field.name}"></mat-datepicker-toggle>
        <mat-datepicker #picker${field.name}></mat-datepicker>`;
}
function textarea(field) {
    return `<textarea matInput placeholder="${placeholder(field)}" formControlName="${field.name}"></textarea>`;
}
function select(field) {
    return `<mat-label>${placeholder(field)}</mat-label>
        <mat-select formControlName="${field.name}">
            ${options(field.options)}
        </mat-select>`;
}
function options(options) {
    if (Array.isArray(options) && options.length) {
        let string = '';
        options.map((op, index, arr) => {
            for (const [key, value] of Object.entries(op)) {
                string += `<mat-option value="${key}">${value}</mat-option>${(index == arr.length - 1) ? '' : '\n\t\t\t'}`;
            }
        });
        return string;
    }
    return `<mat-option value="key">value</mat-option>`;
}
//# sourceMappingURL=utils.js.map