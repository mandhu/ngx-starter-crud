import { apply, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { Schema } from "./Schema";

import { uppercaseFirst } from "./utils/utils";
import { strings } from "@angular-devkit/core";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngx(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(_options);

    const folder = url('./files');

    const templateP = apply(folder, [
        template({
          ..._options,
          ...strings,
          uppercaseFirst
        })
    ]);

    return mergeWith(templateP)(tree, _context);
  };
}
