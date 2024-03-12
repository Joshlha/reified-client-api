import { Organization } from "./organization_sidebar"

export type Dimension =
    | { width: number | string; height: number | string }
    | { width: number | string }
    | { height: number | string }

// Actions
export type Resize = (dims: Dimension) => {
    errors: any
    resize: {
        width: string
        height: string
    }
}

export type Create = (newInstance: {
    location: string
    url: string
    size?: { width: string; height: string }
}) => {
    errors: any
    "instances.create": Instance[]
}

export type Instance = {
    instanceGuid: string
    host: string
    product: string
    location: string
    account: {
        subdomain: string
    }
    status: string
}

export type Instances = {
    [instanceGuid: string]: Instance
}

// Objects
export interface Account {
    readonly planName: string
    readonly subdomain: string
    readonly daysLeftInTrial: number
    readonly timeZone: TimeZone
}

export interface User {
    readonly id: number
    readonly email: string
    readonly groups: Group[]
    readonly organizations: Organization[]
    readonly identities: Identity[]
    readonly name: string
    readonly role: string | number
    externalId: string
    readonly locale: string
    details: string
    notes: string
    alias: string
    signature: string
    readonly timeZone: TimeZone
    readonly tags: string[]
    readonly avatarUrl: string
}

export interface UserSetters {}

export interface Group {
    readonly id: number
    readonly name: string
}

export interface Identity {
    readonly id: number
    readonly type: string
    readonly value: string
    readonly verified: boolean
    readonly primary: boolean
    readonly userId: number
    readonly undeliverableCount: number
    readonly deliverableState: string
}

export interface TimeZone {
    readonly name: string
    readonly translatedName: string
    readonly ianaName: string
    readonly offset: string
    readonly FormattedOffset: string
}

export interface AppsTray {
    readonly isVisible: boolean

    show(): { "appsTray.isVisible": true }
    hide(): { "appsTray.isVisible": false }
}

export interface MetaData {
    readonly instanceGuid: string
    readonly product: string
    readonly account: {
        readonly subdomain: string
    }
    readonly location: string
    readonly ticketId: number
}

// Addition Properties
export type Visible = boolean

// Additional Actions
export type Hide = () => void
export type Show = () => void
export type Notify = (
    message: string,
    kind?: "notice" | "alert" | "error",
    duration?: number,
    options?: { sticky: boolean },
) => void
export type RouteTo = (
    tabType: "ticket" | "user" | "views" | "organization" | "nav_bar",
    id?: string | number,
    newTicket?: boolean,
    appName?: string,
    appSection?: string,
) => any
