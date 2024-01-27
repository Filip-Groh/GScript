import { tokenize } from './lexer';
import { AST } from './parser';
import { interpret } from './interpreter';

function randomOperator(): string {
    const operators = [
        "+",
        "-",
        "*",
        "/",
        "**"
    ]
    return operators[Math.round(Math.random() * (operators.length - 1))] || ""
}

function randInt(range: number): string {
    return (Math.round(Math.random() * range)).toString()
}

function generateRandomExpression(numOfOperators: number): string {
    let result = randInt(100)
    for (let i = 0; i < numOfOperators; i++) {
        result += randomOperator() + randInt(1000000)
    }
    return result
}

function generateRandomExpressions(length: number): string[] {
    let result: string[] = []
    for (let i = 0; i < length; i++) {
        result.push(generateRandomExpression(2))
    }
    return result
}

let expressions = generateRandomExpressions(1500)
console.log(expressions.map((expression) => {
    const tokens = tokenize(expression);
    const ast = new AST(tokens).parse()
    const result = interpret(ast)
    const evaluation = eval(expression)
    const isEqual = result == evaluation
    if (!isEqual) {
        console.error("Wrong: ", expression, "\nComputed: ", result, "\nCorrect: ", evaluation)
    }
    return isEqual
}))