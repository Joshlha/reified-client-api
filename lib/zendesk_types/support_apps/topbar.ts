export namespace TopBarTypes {

    export type Popover = (arg: { width: number | 'auto', height: number } | 'toggle' | 'hide' | 'show') => void

    export type IconSymbol = (symbolName: string) => void

    export type IconChars = (twoChars: string) => void
}