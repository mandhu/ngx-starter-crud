# ngx-starter-crud

Crud generator for [ngx-starter](https://github.com/mandhu/ngx-starter) - Angular project starter

# Installation
```sh
$ npm install ngx-starter-crud
```

## Usage
1. Clone the following repo ``https://github.com/mandhu/ngx-starter``
    ```
    git clone https://github.com/mandhu/ngx-starter
    cd ngx-starter && npm i ngx-starter-crud
    ```
    NOTE: You can use this package any angular project, but decorators are not available 
2. Create folder and files
    - Create schemas folder inside project root
    - Create all model inside schemas folder

3. Model File
    ``sample model file:  Bank.json``
```
{
  "title": "Bank",           // required
  "api": "/api/banks",       // required
  "fields": [
    {
      "name": "name",
      "dbType": "string",
      "htmlType": "text",
      "placeholder": "Name",
      "sort": true
    },
    {
      "name": "country_id",
      "dbType": "string",
      "htmlType": "select-auto",
      "validates": [
        "required"
      ]
    },
    {
      "name": "age",
      "dbType": "integer",
      "htmlType": "number",
      "placeholder": "Age",
      "sort": true,
      "validates": [
        "required",
        "email"
      ]
    },
    {
      "name": "description",
      "dbType": "string",
      "htmlType": "text",
      "placeholder": "Description",
      "sort": false
    },
    {
      "name": "expired_at",
      "dbType": "date",
      "htmlType": "date",
      "sort": false
    },{
      "name": "status",
      "dbType": "integer",
      "htmlType": "select",
      "options": [
        {"1":  "Active"},
        {"2":  "Suspended"},
        {"3":  "Out of town"}
      ],
      "sort": false
    },
    {
      "name": "remarks",
      "dbType": "text",
      "htmlType": "textarea",
      "sort": false
    }
  ]
} 
```
4. Create CRUD
``` 
ng g ngx-starter-crud:ngx [component-name] OR
ng g ngx-starter-crud:ngx [component-name] --file=[model file name without .json]
```
#### Example

if model file name and component name are same
```
ng g ngx-starter-crud:ngx Bank
```

if model file name and component name are different
```
ng g ngx-starter-crud:ngx banks --file="Bank"
```

NOTE: For now you need update manualy parent model declerations, imports and other array and routing modele file. ;)

### Fields

| Field | Required | Type | Default | Description
| ------ | ------ | ------ | ----- | ----- |
| name | Yes | string | null | Name of the field. Use for form control name 
| dbType | No | string | null | DB field type |  
| htmlType | Yes | string | null | Support type: text,number,textarea,date,select,select-auto (auto complete)
| options | No | string[] | emplty option | If htmlType is 'select' provide options array
| placeholder | No | string | null | If not prove name cover to humanize form and considered as place holder, Eg. name: 'full_name' conver to  palceholder:'Full Name'
| sort | No | boolean | null | Listing table column header sortable or not
| validates | No | string [] | null | FormControll valitors, support angular form validators, Eg .requires, email, max(8), min(8)


### TODO
- Update Parent model declarations, imports, entryComponents array automatically
- Update parent routing module file automatically

