import { collectVariableUsage } from "tsutils";
import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "no-parameter-reassignment",
        description: "Disallows reassigning parameters.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "typescript",
        typescriptOnly: false
    };

    public static FAILURE_PARAM(name: string) {
        return `Unused variables should only be used in function parameters. Remove leading underscore from ${name} variable.`;
    }

    public static FAILURE_REUSE(name: string) {
        return `${name} is not an unused parameter. Remove leading underscore from param name.`;
    }

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<any>): void {
    collectVariableUsage(ctx.sourceFile).forEach((variable, identifier) => {
        const { text, parent } = identifier;

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
