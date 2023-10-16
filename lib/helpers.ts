import {
    Unarray,
    ZendeskProperty,
    ZendeskObject,
    ZendeskIndexable,
    IndexableActionPath,
} from "./wrapper_types"

export function newIndexable<T extends any[]>(
    name: string,
    construct: (
        identifier: string,
    ) => Unarray<T> extends string | boolean | number
        ? ZendeskProperty<Unarray<T>>
        : ZendeskObject<Unarray<T>>,
): ZendeskIndexable<T> {
    const returnVal: ZendeskIndexable<T> = (identifier: string | number) => {
        const actualIdentifier = validateIdentifier(identifier)
        return construct(actualIdentifier)
    }
    returnVal._path = name
    return returnVal
}

export function newIndexableActionPath<T>(
    indexable: IndexableActionPath<T>,
): IndexableActionPath<T> {
    return (identifier: string | number) => {
        const actualIdentifier = validateIdentifier(identifier)
        return indexable(actualIdentifier)
    }
}

function validateIdentifier(identifier: string | number): string {
    if (typeof identifier == "string") {
        return `:${identifier}`
    } else {
        return `.${identifier}`
    }
}
