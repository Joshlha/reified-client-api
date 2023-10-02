export type IconSymbol = (symbolName: string) => void

export type IconChars = (twoChars: string) => void

export type AppRouteChanged = (data: { appRoute: string, appTitle: string, appParams: any }) => void