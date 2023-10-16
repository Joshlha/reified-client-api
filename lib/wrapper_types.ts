import { User, UserSetters } from "./zendesk_types/support_apps/common"
import {
    Organization,
    OrganizationSetters,
} from "./zendesk_types/support_apps/organization_sidebar"
import {
    Comment,
    Ticket,
    TicketSetters,
    Form,
    FormSetters,
    CommentSetters,
} from "./zendesk_types/support_apps/ticket_sidebar"

export type ZendeskEvent<T> = { _path: string }
export type ZendeskObject<T> = {
    _path: string
} & {
    [K in ReadonlyKeys<NonFunctions<T>>]: T[K] extends string | number | boolean
        ? ZendeskProperty<T[K]>
        : T[K] extends Array<any>
        ? ZendeskIndexable<T[K]>
        : ZendeskObject<T[K]>
} & {
    [K in WritableKeys<NonFunctions<T>>]: T[K] extends
        | string
        | number
        | boolean
        | any[]
        ? ZendeskWritableProperty<T[K], RelativeType<K, T>>
        : ZendeskWritableObject<T[K], RelativeType<K, T>>
} & {
    custom_field?: <F>(identifier: string) => ZendeskWritableProperty<F, F>
}

export type ZendeskProperty<T> = { _path: string }
export type ZendeskAction<F> = { _path: string }

export type ZendeskIndexable<T extends any[]> = {
    _path: string
    (
        identifier: string | number,
    ): Unarray<T> extends string | boolean | number
        ? ZendeskProperty<Unarray<T>>
        : ZendeskObject<Unarray<T>>
}

export type ZendeskWritableProperty<T, W> = ZendeskProperty<T> & {
    _writeType: W
}
export type ZendeskWritableObject<T, W> = ZendeskObject<T> & { _writeType: W }

export type ZendeskObjectPath<T> = T extends any[]
    ? ZendeskIndexable<T>
    :
          | ZendeskObject<T>
          | ZendeskProperty<T>
          | ZendeskWritableObject<T, any>
          | ZendeskWritableProperty<T, any>

export type ZendeskActionPath<T> = T extends any[]
    ? IndexableActionPath<T>
    : {
          [K in keyof T as T[K] extends any[]
              ? Unarray<T[K]> extends object
                  ? IsEmptyObject<PickFunctions<Unarray<T[K]>>> extends false
                      ? K
                      : never
                  : never
              : T[K] extends Function
              ? K
              : T[K] extends object
              ? IsEmptyObject<PickFunctions<T[K]>> extends false
                  ? K
                  : never
              : never]: T[K] extends Function
              ? ZendeskAction<T[K]>
              : T[K] extends any[]
              ? IndexableActionPath<T[K]>
              : ZendeskActionPath<T[K]>
      }

export type IndexableActionPath<T> = (
    identifier: string | number,
) => ZendeskActionPath<Unarray<T>>

// Utility types:

export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
    keyof Obj,
] extends [never]
    ? true
    : false

export type Unarray<T> = T extends Array<infer U> ? U : T

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P
    >
}[keyof T]

export type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
    >
}[keyof T]

export type PickFunctions<T> = {
    [P in keyof T as T[P] extends Function ? P : never]: T[P]
}

export type NonFunctions<T> = {
    [P in keyof T as T[P] extends Function ? never : P]: T[P]
}

export type RelativeType<T extends keyof S, S> = T extends keyof RelatedTypes<S>
    ? Pick<RelatedTypes<S>, T>[T]
    : S[T]

export type RelatedTypes<T> = T extends Ticket
    ? TicketSetters
    : T extends User
    ? UserSetters
    : T extends Form
    ? FormSetters
    : T extends Comment
    ? CommentSetters
    : T extends Organization
    ? OrganizationSetters
    : never
