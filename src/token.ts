export enum StaticTokenType {
    Plus = "+",
    Minus = "-",
    Multiply = "*",
    Divide = "/",
    Power = "**",
    LParen = "(",
    RParen = ")",
    EOF = "/EOF",
}

export enum DynamicTokenType {
    Number = "(NUMBER)",
    Keyword = "(KEYWORD)",
    Identifier = "(IDENTIFIER)"
}

export enum Keywords {
    Let = "let"
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
            case DynamicTokenType.Keyword:
                return "KEYWORD:" + this.value
            case DynamicTokenType.Identifier:
                return "IDENTIFIER:" + this.value
            case StaticTokenType.Plus:
                return "+"
            case StaticTokenType.Minus:
                return "-"
            case StaticTokenType.Multiply:
                return "*"
            case StaticTokenType.Divide:
                return "/"
            case StaticTokenType.Power:
                return "**"
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
    tokens = JSON.parse(JSON.stringify(tokens));
    while (tokens.length > 0) {
        const token = tokens.shift()
        if (token) {
            result.push(token.toString())
        }
    }
    return result
}