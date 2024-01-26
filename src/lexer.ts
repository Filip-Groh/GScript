import { StaticTokenType, DynamicTokenType, Token } from './token'

interface StringDictionary<T> {
    [key: string]: T
}

const tokenBinding: StringDictionary<StaticTokenType> = {
    "+": StaticTokenType.Plus,
    "-": StaticTokenType.Minus,
    "*": StaticTokenType.Multiply,
    "/": StaticTokenType.Divide,
    "(": StaticTokenType.LParen,
    ")": StaticTokenType.RParen
}

export function tokenize(input: string): Token[] {
    let chars: string[] = input.split("")
    let result: Token[] = []
    let index = 0

    while (index <= input.length) {
        let currentChar = chars[index]
        if (!currentChar) {
            result.push(new Token(StaticTokenType.EOF))
            break
        }
        if (currentChar.includes(" ")) {
            index += 1
            continue
        }
        let binding = tokenBinding[currentChar]
        if (binding != undefined) {
            result.push(new Token(binding))
        }
        if (Number(currentChar)) {
            let currentNumber = ""
            while (Number(currentChar)) {
                currentNumber += currentChar
                index += 1
                currentChar = chars[index]
            }
            index -= 1
            result.push(new Token(DynamicTokenType.Number, currentNumber))
        }
        index += 1
    }

    return result
}