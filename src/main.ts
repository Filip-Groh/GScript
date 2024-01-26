// import prompt from 'prompt-sync';
import { readFileSync } from 'fs';
import { tokenize } from './lexer';
// import { readTokens } from './token';
import { AST } from './parser';

// function readFile() {
//     const filePath = prompt()("Input filepath: ");
//     const file = readFileSync(filePath, 'utf8');
//     return file;
// }

function readDefault() {
    const file = readFileSync("test.gscript", 'utf8');
    return file;
}

const input = readDefault();
const tokens = tokenize(input);
const ast = new AST(tokens).parse()
console.log(ast.toString())