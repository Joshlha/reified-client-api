import { Group, User, Identity, TimeZone } from "./common"
import { OrganizationSidebarTypes } from "./organization_sidebar"

export type ChannelName = 'web' | 'internal' | 'voice' | 'chat' | 'native_messaging' | 'line' | 'wechat' | 'sunshine_conversations_twitter_dm' | 'sunshine_conversations_facebook_messenger' | 'instagram_dm' | 'whatsapp' | 'any_channel' | 'twitter' | 'facebook' | 'api' | 'chat_transcript'
export type Priority = 'low' | 'normal' | 'high' | 'urgent'
export type TicketStatus = 'new' | 'open' | 'pending' | 'hold' | 'solved'
export type TicketType = 'question' | 'incident' | 'problem' | 'task'
export type CommentType = 'facebookPrivateMessage' | 'facebookWallReply' | 'internalNote' | 'publicReply' | 'twitterDirectMessage' | 'twitterReply'

export type DisableSave = () => void
export type EnableSave = () => void

export interface Ticket {
    assignee: { readonly group: Group, readonly user: User } 
    brand: Brand
    readonly collaborators: User[] // add and remove
    readonly comment: Comment
    readonly comments: CommentEvent[]
    readonly conversation: {
        readonly attachments: {
            readonly contentType: string
            readonly contentUrl: string
            readonly filename: string
        }[]
        readonly author: {
            readonly id: number | null
            readonly avatar: string
            readonly name: string
            readonly role: 'system' | 'trigger' | 'agent' | 'admin' | 'end-user'
        }
        readonly channel: {
            readonly name: ChannelName
        }
        readonly message: {
            readonly content: string | null
            readonly contentType: ChannelName | null
        }
        readonly timestamp: string
    }[]
    readonly createdAt: string
    readonly description: string
    // readonly editor: TicketEditorTypes.TicketEditor
    externalId: string
    readonly form: Form
    readonly id: number
    readonly isNew: boolean
    readonly organization: OrganizationSidebarTypes.Organization
    readonly postSaveAction: string
    priority: Priority
    recipient: string
    requester: User
    sharedWith: SharingAgreement
    status: TicketStatus
    statusCategory: string
    subject: string
    tags: string[]
    type: TicketType
    readonly updatedAt: string
    readonly via: Via
    readonly viewers: CollisionUser[]
    sendMessage: (arg: { channel: string, message: string }) => void,
    addCollaborator: (arg: { email: string } | { id: string }) => void,
    removeCollaborator: (arg: { email: string } | { id: string }) => void,
    addTags: (arg: string[]) => void,
    removeTags: (arg: string[]) => void,
}

export interface TicketSetters {
    assignee: { groupId: string, userId?: string }
    brand: Brand | { id: string }
    recipient: string
    requester: { email: string, name: string }// | { id: string }
    sharedWith: { id: string }
}

export interface Channel {
    readonly name: ChannelName
    readonly sessionBased: boolean
    readonly sessionActive: boolean
}

export interface Comment {
    readonly attachments: Attachment[]
    text: string
    type: CommentType
    readonly useRichText: boolean

    appendHtml(arg: string): { 'errors': any }
    appendMarkdown(arg: string): { 'errors': any }
    appendText(arg: string): { 'errors': any }
}

export interface CommentSetters {}

export interface Attachment {
    readonly contentType: string
    readonly contentUrl: string
    readonly fileName: string
    readonly thumbnailUrl: string
}

export interface CommentEvent {
    readonly id: number
    readonly value: string
    readonly author: User
    readonly via: Via
    readonly imageAttachments: Attachment[]
    readonly nonImageAttachments: Attachment[]
}

export interface Brand {
    readonly hasHelpCenter: boolean
    readonly id: number
    readonly isActive: boolean
    readonly isDefault: boolean
    readonly logo: {
        readonly contentType: string
        readonly contentUrl: string
        readonly filename: string
    }
    readonly name: string
    readonly subdomain: string
    readonly url: string
}

export interface CollisionUser {
    readonly id: number
    readonly email: string
    readonly groups: Group[]
    readonly organizations: OrganizationSidebarTypes.Organization[]
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
    readonly isEditing: boolean
    readonly isIdle: boolean
}

export interface SharingAgreement {
    readonly id: number
    readonly name: string
    readonly partnerName: string
}

export interface TicketField {
    readonly name: string
    label: string
    readonly optionValues: TicketFieldOption[] // TODO: Individually settable
    readonly optionGroups: TicketFieldOption[]
    readonly isRequired: boolean
    readonly requiredOnStatuses: TicketStatus[]
    readonly isVisible: boolean
    readonly isEnabled: boolean
    readonly type: TicketType

    // optionValues can be indexed with .value
    // optionGroups can be indexed with :Identifier

    disable(): void
    enable(): void
    hide(): void
    show(): void
    toggle(): void
}

export interface TicketFieldOption {
    readonly isEnabled: boolean
    readonly isVisible: boolean
    label: string
    readonly value: string

    disable(): void
    enable(): void
    hide(): void
    show(): void
    toggle(): void
}

export interface Form {
    id: number
}

export interface FormSetters { id: { id: number } | number }

export interface Macro {
    id: number
    availability_type: string
    description: string
    title: string

    macro(): void
}

export interface Via {
    readonly channel: string | number
    readonly source: {
        readonly from: any
        readonly to: any
        readonly rel: any
    }
}
