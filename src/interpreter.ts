import { Node, NodeTypes } from "./parser";

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
        case NodeTypes.Number:
            return Number(ast.value)
        case NodeTypes.Empty:
            return 0
    }
}