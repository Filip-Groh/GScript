// import prompt from 'prompt-sync';
// import { readFileSync } from 'fs';
import { tokenize } from './lexer';
import { readTokens } from './token';
import { AST } from './parser';
import { interpret } from './interpreter';

// function readFile() {
//     const filePath = prompt()("Input filepath: ");
//     const file = readFileSync(filePath, 'utf8');
//     return file;
// }

// function readDefault() {
//     const file = readFileSync("test.gscript", 'utf8');
//     return file;
// }

// const input = readDefault();
let input = "let a 5+5"
const tokens = tokenize(input);
console.log(readTokens(tokens))
const ast = new AST(tokens).parse()
console.log(ast.toString())
const result = interpret(ast)
console.log(result)

input = "a * 5"
const tokens2 = tokenize(input);
console.log(readTokens(tokens2))
const ast2 = new AST(tokens2).parse()
console.log(ast2.toString())
const result2 = interpret(ast2)
console.log(result2)