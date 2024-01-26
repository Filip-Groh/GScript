export enum StaticTokenType {
    Plus = "+",
    Minus = "-",
    Multiply = "*",
    Divide = "/",
    LParen = "(",
    RParen = ")",
    EOF = "/EOF",
}

export enum DynamicTokenType {
    Number = "(NUMBER)"
}

export class Token {
    public tokenType: StaticTokenType | DynamicTokenType
    public value: string

    public constructor(tokenType: StaticTokenType | DynamicTokenType, value: string = "") {
        this.tokenType = tokenType
        this.value = value
    }

    public toString(): string {
        switch (this.tokenType) {
            case DynamicTokenType.Number:
                return this.value
            case StaticTokenType.Plus:
                return "+"
            case StaticTokenType.Minus:
                return "-"
            case StaticTokenType.Multiply:
                return "*"
            case StaticTokenType.Divide:
                return "/"
            case StaticTokenType.LParen:
                return "("
            case StaticTokenType.RParen:
                return ")"
            case StaticTokenType.EOF:
                return "/EOF"
            default: 
                return ""
        }
    }
}

export function readTokens(tokens: Token[]): string[] {
    const result: string[] = []
    while (tokens.length > 0) {
        const token = tokens.shift()
        if (token) {
            result.push(token.toString())
        }
    }
    return result
}