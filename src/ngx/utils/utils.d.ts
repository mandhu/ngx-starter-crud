import { Model } from "../models/Model";
export declare function uppercaseFirst(name: string): string;
export declare function capitalizeEachWord(str: string): string;
export declare function placeholder(field: any): any;
export declare function title(name: string, model: Model): string;
export declare function modelFieldsToArray(model: Model): string;
export declare function makeValidators(validates: any): string | undefined;
export declare function renderField(field: any): string | undefined;
