import { Node, NodeTypes } from "./parser";

enum VariableStates {
    Declared = "Declared",
    Assigned = "Assigned"
}

class Variable {
    public variableState: VariableStates
    public value?: number
    public constructor(variableState: VariableStates, value?: number) {
        this.variableState = variableState
        if (value) {
            this.value = value
        }
    }
}

let heap = new Map<string, Variable>()

export function interpret(ast: Node): number {
    switch (ast.type) {
        case NodeTypes.Plus:
            if (ast.left && ast.right) {
                let left = interpret(ast.left)
                let right = interpret(ast.right)
                return left + right
            }
            return 0
        case NodeTypes.Minus:
            if (ast.left && ast.right) {
                let left = interpret(ast.left)
                let right = interpret(ast.right)
                return left - right
            }
            return 0
        case NodeTypes.Multiply:
            if (ast.left && ast.right) {
                let left = interpret(ast.left)
                let right = interpret(ast.right)
                return left * right
            }
            return 0
        case NodeTypes.Divide:
            if (ast.left && ast.right) {
                let left = interpret(ast.left)
                let right = interpret(ast.right)
                return left / right
            }
            return 0
        case NodeTypes.Power:
            if (ast.left && ast.right) {
                let left = interpret(ast.left)
                let right = interpret(ast.right)
                return left ** right
            }
            return 0
        case NodeTypes.Declaration:
            heap.set(ast.value, new Variable(VariableStates.Declared))
            return 0
        case NodeTypes.Inicialization:
            if (ast.left && ast.right) {
                interpret(ast.left)
                let variable = heap.get(ast.value)
                if (variable) {
                    variable.variableState = VariableStates.Assigned
                    variable.value = interpret(ast.right)
                }
            }
            return 0
        case NodeTypes.Access:
            return heap.get(ast.value)?.value || 0
        case NodeTypes.Number:
            return Number(ast.value)
        case NodeTypes.Empty:
            return 0
    }
}