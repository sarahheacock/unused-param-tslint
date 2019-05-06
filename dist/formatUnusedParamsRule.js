"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_PARAM = function (name) {
        return "Unused variables should only be used in function parameters. Remove leading underscore from " + name + " variable.";
    };
    Rule.FAILURE_REUSE = function (name) {
        return name + " is not an unused parameter. Remove leading underscore from param name.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        ruleName: "no-parameter-reassignment",
        description: "Disallows reassigning parameters.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: false
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    tsutils_1.collectVariableUsage(ctx.sourceFile).forEach(function (variable, identifier) {
        var text = identifier.text, parent = identifier.parent;
        if (text[0] !== "_") {
            return;
        }
        // check variable is a parameter
        if (parent.kind !== ts.SyntaxKind.Parameter) {
            return ctx.addFailureAtNode(parent, Rule.FAILURE_PARAM(text));
        }
        // check that we are not reusing single use variables
        if (variable.uses.length) {
            return ctx.addFailureAtNode(parent, Rule.FAILURE_REUSE(text));
        }
    });
}
