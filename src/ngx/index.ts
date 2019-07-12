import {
  apply, branchAndMerge, chain,
  mergeWith, move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { Schema } from "./models/Schema";

import * as utils from "./utils/utils";
import { strings } from "@angular-devkit/core";
import { Model } from "./models/Model";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngx(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const modelBuffer = tree.read('/src/banks.json');

    if (modelBuffer === null) {
      throw new SchematicsException(`Model file does not exist.`);
    }

    const modelJson = modelBuffer.toString('utf-8');
    const model = JSON.parse(modelJson) as Model;

    const componentFolder = url('./component');
    const serviceFolder = url('./service');

    const componentTemplate = apply(componentFolder, [
      template({
        ..._options,
        ...strings,
        ...utils,
        model
      }),
      move('app/master/')
    ]);

    const serviceTemplate = apply(serviceFolder, [
      template({
        ..._options,
        ...strings,
        ...utils,
        model
      }),
      move('app/services/')
    ]);

    return chain([
      branchAndMerge(chain([
        mergeWith(componentTemplate),
        mergeWith(serviceTemplate),
      ])),
    ])(tree, _context);

  };
}
