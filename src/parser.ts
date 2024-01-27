import { Token, StaticTokenType, DynamicTokenType, Keywords } from "./token";

export enum NodeTypes {
    Plus = "+",
    Minus = "-",
    Multiply = "*",
    Divide = "/",
    Power = "**",
    Number = "(NUMBER)",
    Declaration = "(DECLARATION)",
    Inicialization = "(INICIALIZATION)",
    Access = "(ACCESS)",
    Empty = "(empty)"
}

export class Node {
    public type: NodeTypes
    public value: string
    public left?: Node
    public right?: Node

    public constructor(type: NodeTypes, value: string = "", left?: Node, right?: Node) {
        this.type = type
        this.value = value
        if (left) {
            this.left = left    
        }
        if (right) {
            this.right = right
        }
    }

    public toString(): string {
        switch (this.type) {
            case NodeTypes.Plus:
                return "(" + this.left?.toString() + " + " + this.right?.toString() + ")"
            case NodeTypes.Minus:
                return "(" + this.left?.toString() + " - " + this.right?.toString() + ")"
            case NodeTypes.Multiply:
                return "(" + this.left?.toString() + " * " + this.right?.toString() + ")"
            case NodeTypes.Divide:
                return "(" + this.left?.toString() + " / " + this.right?.toString() + ")"
            case NodeTypes.Power:
                return "(" + this.left?.toString() + " ** " + this.right?.toString() + ")"
            case NodeTypes.Number:
                return this.value
            case NodeTypes.Declaration:
                return "(" + "let" + " " + this.value + ")"
            case NodeTypes.Inicialization:
                return "(" + this.left?.toString() + " = " + this.right?.toString() + ")"
            case NodeTypes.Access:
                return "(" + this.value + ")"
            case NodeTypes.Empty:
                return ""
        }
    }
}

export class AST {
    private tokens: Token[]
    private index: number
    
    public constructor(tokens: Token[]) {
        this.tokens = tokens
        this.index = 0
    }

    public parse(): Node {
        return this.Expr()
    }

    private Expr(): Node {
        let currentToken = this.tokens[this.index]
        if (currentToken?.tokenType == DynamicTokenType.Keyword && currentToken.value == Keywords.Let) {
            this.index += 1
            currentToken = this.tokens[this.index]
            if (currentToken?.tokenType == DynamicTokenType.Identifier) {
                let identifier = currentToken.value
                let declaration = new Node(NodeTypes.Declaration, identifier)
                this.index += 1
                let expression = this.ArithExpr()
                return new Node(NodeTypes.Inicialization, identifier, declaration, expression)
            }
        }
        return this.ArithExpr()
    }

    private ArithExpr(): Node {
        let left = this.Term()
        let currentToken = this.tokens[this.index]
        while (currentToken?.tokenType == StaticTokenType.Plus || currentToken?.tokenType == StaticTokenType.Minus) {
            switch (currentToken.tokenType) {
                case StaticTokenType.Plus:
                    this.index += 1
                    left =  new Node(NodeTypes.Plus, undefined, left, this.Term())
                    break
                case StaticTokenType.Minus:
                    this.index += 1
                    left =  new Node(NodeTypes.Minus, undefined, left, this.Term())
                    break
            }
            currentToken = this.tokens[this.index]
        }
        return left
    }

    private Term(): Node {
        let left = this.Factor()
        let currentToken = this.tokens[this.index]
        while (currentToken?.tokenType == StaticTokenType.Multiply || currentToken?.tokenType == StaticTokenType.Divide) {
            switch (currentToken.tokenType) {
                case StaticTokenType.Multiply:
                    this.index += 1
                    left =  new Node(NodeTypes.Multiply, undefined, left, this.Factor())
                    break
                case StaticTokenType.Divide:
                    this.index += 1
                    left =  new Node(NodeTypes.Divide, undefined, left, this.Factor())
                    break
            }
            currentToken = this.tokens[this.index]
        }
        return left
    }

    private Factor(): Node {
        let left = this.Literal()
        let currentToken = this.tokens[this.index]
        while (currentToken?.tokenType == StaticTokenType.Power) {
            switch (currentToken.tokenType) {
                case StaticTokenType.Power:
                    this.index += 1
                    left =  new Node(NodeTypes.Power, undefined, left, this.Literal())
                    break
            }
            currentToken = this.tokens[this.index]
        }
        return left
    }

    private Literal(): Node {
        let currentToken = this.tokens[this.index]
        if (currentToken?.tokenType == DynamicTokenType.Number) {
            this.index += 1
            return new Node(NodeTypes.Number, currentToken.value)
        }
        if (currentToken?.tokenType == StaticTokenType.LParen) {
            this.index += 1
            let expr = this.ArithExpr()
            currentToken = this.tokens[this.index]
            if (currentToken?.tokenType == StaticTokenType.RParen) {
                this.index += 1
                return expr
            }
        }
        if (currentToken?.tokenType == DynamicTokenType.Identifier) {
            this.index += 1
            return new Node(NodeTypes.Access, currentToken.value)
        }
        return new Node(NodeTypes.Empty)
    }
}