export type UserFieldName = 'access' | 'alias' | 'details' | 'groups' | 'locales' | 'notes' | 'organization' | 'organizations' | 'role' | 'signature' | 'tags' | 'timezone' | 'user_type'

export type UserFields = UserProfilePage.Field[]

export namespace UserProfilePage {
    export interface Field {
        readonly name: string
        readonly isVisible: boolean
        readonly options: FieldOption[]
        
        show(): void
        hide(): void
        toggle(): void
    }

    export interface FieldOption {
        readonly label: string
        readonly value: string
    }
}
