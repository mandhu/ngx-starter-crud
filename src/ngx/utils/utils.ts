import { Model } from "../models/Model";

export function uppercaseFirst(name: string) {
    return name.replace(/\w+/g, function(txt) {
        // uppercase first letter and add rest unchanged
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, '');
}

export function capitalizeEachWord(str: string) {
    var frags = str.split('_');

    frags.map(word => {
        let uw = word.charAt(0).toUpperCase() + word.slice(1);
        return uw;
    });

    console.log(frags);
    return frags.join(' ');
}


export function modelFieldsToArray(model: Model) {
    let fields: any[] = [];

    model.fields.map((field, index) => {
        fields.push(`${index == 0 ? "": " "}"${field.name}"`);
    });

    return `[${fields}, "actions"]`;
}

export function renderField(field: any) {
    switch (field.htmlType) {
        case 'text':
            return input(field);
        // case 'date':
        //     return date(field);
        // case 'textarea':
        //     return textarea(field);
    }
}

function input(field: any) {
    return `<ng-container cdkColumnDef="${field.name}">
                <mat-header-cell *cdkHeaderCellDef ${(field.sort) ? 'mat-sort-header' : '' }>
                    ${field.placeholder}
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.${field.name}}}</mat-cell>
            </ng-container>`;
}
//
// function date(field) {
//
// }
//
// function textarea(field) {
//
// }
