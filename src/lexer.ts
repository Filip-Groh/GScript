import { StaticTokenType, DynamicTokenType, Keywords, Token } from './token'

interface StringDictionary<T> {
    [key: string]: T
}

const tokenBindingTable: StringDictionary<StaticTokenType> = {
    "+": StaticTokenType.Plus,
    "-": StaticTokenType.Minus,
    "*": StaticTokenType.Multiply,
    "/": StaticTokenType.Divide,
    "(": StaticTokenType.LParen,
    ")": StaticTokenType.RParen
}

const keywordBindingTable: StringDictionary<Keywords> = {
    "let": Keywords.Let
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
        let tokenBinding = tokenBindingTable[currentChar]
        if (tokenBinding != undefined) {
            if (tokenBinding == StaticTokenType.Multiply) {
                index += 1
                currentChar = chars[index]
                if (currentChar && tokenBindingTable[currentChar] == StaticTokenType.Multiply) {
                    result.push(new Token(StaticTokenType.Power))
                } else {
                    result.push(new Token(StaticTokenType.Multiply))
                    continue
                }
            } else {
                result.push(new Token(tokenBinding))
            }
        }
        if ("123456789".includes(currentChar)) {
            let currentNumber = ""
            while (currentChar && "0123456789".includes(currentChar)) {
                currentNumber += currentChar
                index += 1
                currentChar = chars[index]
            }
            result.push(new Token(DynamicTokenType.Number, currentNumber))
            continue
        }
        if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(currentChar)) {
            let currentIdentifier = ""
            while (currentChar && "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(currentChar)) {
                currentIdentifier += currentChar
                index += 1
                currentChar = chars[index]
            }
            let keywordBinding = keywordBindingTable[currentIdentifier]
            if (keywordBinding != undefined) {
                result.push(new Token(DynamicTokenType.Keyword, currentIdentifier))
                continue
            }
            result.push(new Token(DynamicTokenType.Identifier, currentIdentifier))
            continue
        }
        index += 1
    }

    return result
}