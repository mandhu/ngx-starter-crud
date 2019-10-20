"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const utils = require("./utils/utils");
const core_1 = require("@angular-devkit/core");
function setupOptions(options, host) {
    const workspace = config_1.getWorkspace(host);
    // console.log(workspace);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    if (options.path === undefined) {
        options.path = `/${project.root}/src/${projectDirName}`;
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.servicePath = `${project.root}/src/${projectDirName}/services/`;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function ngx(_options) {
    return (tree, _context) => {
        setupOptions(_options, tree);
        const fileName = _options.file ? _options.file : _options.name;
        const modelBuffer = tree.read(`./src/schemas/${fileName}.json`);
        if (modelBuffer === null) {
            throw new schematics_1.SchematicsException(`Model file does not exist.`);
        }
        const modelJson = modelBuffer.toString('utf-8');
        const model = JSON.parse(modelJson);
        const componentFolder = schematics_1.url('./component');
        const serviceFolder = schematics_1.url('./service');
        const componentTemplate = schematics_1.apply(componentFolder, [
            schematics_1.template(Object.assign({}, _options, core_1.strings, utils, { model })),
            schematics_1.move(`${_options.path}/`)
        ]);
        const serviceTemplate = schematics_1.apply(serviceFolder, [
            schematics_1.template(Object.assign({}, _options, core_1.strings, utils, { model })),
            schematics_1.move(`${_options.servicePath}`)
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(componentTemplate),
                schematics_1.mergeWith(serviceTemplate),
            ])),
        ])(tree, _context);
    };
}
exports.ngx = ngx;
//# sourceMappingURL=index.js.map