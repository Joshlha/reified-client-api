export namespace TicketEditorTypes {
    export interface TicketEditor {
        readonly targetChannel: TargetChannel
        readonly capabilities: Capabilities

        insert(text: string): void
        indent(): void
        outdent(): void
        bold(): void
        italic(): void
        unorderedList(): void
        orderedList(): void
        blockquote(): void
        codespan(): void
        codeblock(): void
        hyperlink(): void
        inlineImage(arg: string): void
        hr(): void
    }

    export interface TargetChannel {
        readonly name: string
        readonly sessionBased: boolean
        readonly sessionActive: boolean
    }

    export interface Capabilities {
        readonly richText: boolean
    }
}