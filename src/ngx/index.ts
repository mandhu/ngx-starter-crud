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

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';

import { Schema } from "./models/Schema";

import * as utils from "./utils/utils";
import { strings } from "@angular-devkit/core";
import { Model } from "./models/Model";


function setupOptions(options: Schema, host: Tree): void {
  const workspace = getWorkspace(host);
  console.log(workspace);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    options.path = `/${project.root}/src/${projectDirName}`;
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;

}


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngx(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    setupOptions(_options, tree);

    console.log(_options);

    const modelBuffer = tree.read('./src/banks.json');

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
