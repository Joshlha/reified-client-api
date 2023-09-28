import { Group } from "./common"

export namespace OrganizationSidebarTypes {
    export type OrganizationFieldName = 'tags' | 'domains' | 'group_id' | 'shared_tickets' | 'shared_comments' | 'details' | 'notes'

    export interface Organization {
        details: string
        domains: string
        externalId: string
        readonly group: Group
        readonly id: number
        readonly name: string
        notes: string
        readonly sharedComments: boolean
        readonly sharedTickets: boolean
        readonly tags: string[]
    }

    export interface OrganizationSetters {}

    export namespace OrganizationProfilePage {
        export interface Field {
            readonly name: OrganizationFieldName
            readonly isVisible: boolean
            readonly options: FieldOption[]
    
            hide(): void
            show(): void
            toggle(): void
        }
    
        export interface FieldOption {
            readonly label: string
            readonly value: string
        }
    }
}