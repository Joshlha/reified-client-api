import { newIndexable, newIndexableActionPath } from "./helpers"
import {
    ZendeskEvent,
    ZendeskObject,
    ZendeskProperty,
    ZendeskAction,
    ZendeskActionPath,
    IndexableActionPath,
    ZendeskIndexable,
} from "./wrapper_types"
import {
    User,
    AppsTray,
    Account,
    Visible,
    Show,
    Hide,
    Notify,
    RouteTo,
} from "./zendesk_types/support_apps/common"
import { Destroy, ModalClose } from "./zendesk_types/support_apps/modal"
import {
    IconSymbol,
    IconChars,
    AppRouteChanged,
} from "./zendesk_types/support_apps/navbar"
import {
    Organization,
    OrganizationProfilePage,
} from "./zendesk_types/support_apps/organization_sidebar"
import {
    CollisionUser,
    Ticket,
    Comment,
    CommentType,
    Priority,
    TicketStatus,
    TicketType,
    Channel,
    EnableSave,
    DisableSave,
    TicketField,
} from "./zendesk_types/support_apps/ticket_sidebar"
import { Popover } from "./zendesk_types/support_apps/topbar"
import { UserFields } from "./zendesk_types/support_apps/user_sidebar"
import { TicketEditor } from "./zendesk_types/support_apps/ticket_editor"

export namespace Support {
    export namespace Common {
        export namespace Events {
            export const api_notification: (
                eventName: string,
            ) => ZendeskEvent<
                (data: {
                    body: any
                    sender: User
                }) => void | Promise<void> | Promise<void>
            > = (eventName) => {
                return { _path: "api_notification." + eventName }
            }

            export namespace window {
                export const resize: ZendeskEvent<
                    (width: string, height: string) => void | Promise<void>
                > = { _path: "window.resize" }
                export const scroll: ZendeskEvent<
                    (scrollTop: boolean) => void | Promise<void>
                > = { _path: "window.scroll" }
            }

            export namespace voice {
                export const dialout: ZendeskEvent<
                    (
                        from: "user_phone_identity" | "ticket_editor",
                        number: string,
                        userId: string | number,
                        ticketId: string,
                    ) => void | Promise<void>
                > = { _path: "voice.dialout" }

                export const error: ZendeskEvent<
                    (code: 0 | 1, message: string) => void | Promise<void>
                > = { _path: "voice.error" }
            }
        }

        export namespace Objects {
            export const appsTray: ZendeskObject<AppsTray> = {
                _path: "appsTray",
                isVisible: {
                    _path: "appsTray.isVisible",
                },
            }

            export const currentAccount: ZendeskObject<Account> = {
                _path: "currentAccount",
                planName: { _path: "currentAccount.planName" },
                subdomain: { _path: "currentAccount.subDomain" },
                daysLeftInTrial: { _path: "currentAccount.daysLeftInTrial" },
                timeZone: {
                    _path: "currentAccount.timeZone",
                    name: { _path: "currentAccount.timeZone.name" },
                    translatedName: {
                        _path: "currentAccount.timeZone.translatedName",
                    },
                    ianaName: { _path: "currentAccount.timeZone.ianaName" },
                    offset: { _path: "currentAccount.timeZone.ianaName" },
                    FormattedOffset: {
                        _path: "currentAccount.timeZone.formattedOffset",
                    },
                },
            }

            export const currentUser: ZendeskObject<User> = {
                _path: "currentUser",
                id: { _path: "currentUser.id" },
                email: { _path: "currentUser.email" },
                groups: newIndexable("currentUser.groups", (identifier) => {
                    return {
                        _path: `currentUser.groups:${identifier}`,
                        name: {
                            _path: `currentUser.groups:${identifier}.name`,
                        },
                        id: { _path: `currentUser.groups:${identifier}.id` },
                    }
                }),
                organizations: newIndexable(
                    "currentUser.organizations",
                    (identifier) => {
                        return {
                            _path: `currentUser.organizations${identifier}`,
                            name: {
                                _path: `currentUser.organizations${identifier}.name`,
                            },
                            id: {
                                _path: `currentUser.organizations${identifier}.id`,
                            },
                            tags: newIndexable(
                                `currentUser.organizations${identifier}.tags`,
                                (identifier2) => {
                                    return {
                                        _path: `currentUser.organizations${identifier}.tags${identifier2}`,
                                    }
                                },
                            ),
                            group: {
                                _path: `currentUser.organizations${identifier}.group`,
                                id: {
                                    _path: `currentUser.organizations${identifier}.group.id`,
                                },
                                name: {
                                    _path: `currentUser.organizations${identifier}.group.name`,
                                },
                            },
                            sharedComments: {
                                _path: `currentUser.organizations${identifier}.sharedComments`,
                            },
                            sharedTickets: {
                                _path: `currentUser.organizations${identifier}.sharedTickets`,
                            },
                            externalId: {
                                _path: `currentUser.organizations${identifier}.externalId`,
                                _writeType: "",
                            },
                            details: {
                                _path: `currentUser.organizations${identifier}.details`,
                                _writeType: "",
                            },
                            notes: {
                                _path: `currentUser.organizations${identifier}.notes`,
                                _writeType: "",
                            },
                            domains: {
                                _path: `currentUser.organizations${identifier}.group.domains`,
                                _writeType: "",
                            },
                        }
                    },
                ),
                identities: newIndexable("currentUser.identities", (i) => {
                    return {
                        _path: `currentUser.identities${i}`,
                        id: { _path: `currentUser.identities${i}.id` },
                        type: { _path: `currentUser.identities${i}.type` },
                        value: { _path: `currentUser.identities${i}.value` },
                        verified: {
                            _path: `currentUser.identities${i}.verified`,
                        },
                        primary: {
                            _path: `currentUser.identities${i}.primary`,
                        },
                        userId: { _path: `currentUser.identities${i}.userId` },
                        undeliverableCount: {
                            _path: `currentUser.identities${i}.undeliverableCount`,
                        },
                        deliverableState: {
                            _path: `currentUser.identities${i}.deliverableState`,
                        },
                    }
                }),
                name: { _path: "currentUser.name" },
                role: { _path: "currentUser.role" },
                externalId: { _path: "currentUser.externalId", _writeType: "" },
                locale: { _path: "currentUser.locale" },
                details: { _path: "currentUser.details", _writeType: "" },
                notes: { _path: "currentUser.notes", _writeType: "" },
                alias: { _path: "currentUser.alias", _writeType: "" },
                signature: { _path: "currentUser.signature", _writeType: "" },
                timeZone: {
                    _path: "currentUser.timeZone",
                    name: { _path: "currentUser.timeZone.name" },
                    translatedName: {
                        _path: "currentUser.timeZone.translatedName",
                    },
                    ianaName: { _path: "currentUser.timeZone.ianaName" },
                    offset: { _path: "currentUser.timeZone.ianaName" },
                    FormattedOffset: {
                        _path: "currentUser.timeZone.formattedOffset",
                    },
                },
                tags: newIndexable("currentUser.tags", (i) => {
                    return { _path: `currentUser.tags${i}` }
                }),
                avatarUrl: { _path: "currentUser.avatarUrl" },
            }

            currentUser.groups._path = "currentUser.groups"
        }

        export namespace Properties {
            export const visible: ZendeskProperty<Visible> = {
                _path: "visible",
            }
        }

        export namespace Actions {
            export const show: ZendeskAction<Show> = {
                _path: "show",
            }

            export const hide: ZendeskAction<Hide> = {
                _path: "hide",
            }

            export const notify: ZendeskAction<Notify> = {
                _path: "notify",
            }

            export const routeTo: ZendeskAction<RouteTo> = {
                _path: "routeTo",
            }
        }
    }

    export namespace TicketSidebar {
        export namespace Events {
            export namespace ticket {
                export namespace assignee {
                    export namespace group {
                        export namespace id {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.group.id.changed",
                            }
                        }
                        export namespace name {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.group.name.changed",
                            }
                        }
                    }
                    export namespace user {
                        export namespace email {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.user.email.changed",
                            }
                        }
                        export namespace externalId {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.user.externalId.changed",
                            }
                        }
                        export namespace id {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.user.id.changed",
                            }
                        }
                        export namespace name {
                            export const changed: ZendeskEvent<
                                () => void | Promise<void>
                            > = {
                                _path: "ticket.assignee.user.name.changed",
                            }
                        }
                    }
                }
                export namespace brand {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.brand.changed",
                    }
                }
                export namespace collaborators {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.collaborators.changed",
                    }
                }
                export namespace comments {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.comments.changed",
                    }
                }
                export namespace conversation {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.conversation.changed",
                    }
                }
                export namespace due_date {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.due_date.changed",
                    }
                }
                export namespace externalId {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.externalId.changed",
                    }
                }
                export namespace form {
                    export namespace id {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticket.form.id.changed",
                        }
                    }
                }
                export namespace postSaveAction {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.postSaveAction.changed",
                    }
                }
                export namespace priority {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.priority.changed",
                    }
                }
                export namespace problem_id {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.problem_id.changed",
                    }
                }
                export namespace requester {
                    export namespace email {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticket.requester.email.changed",
                        }
                    }
                    export namespace externalId {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticket.requester.externalId.changed",
                        }
                    }
                    export namespace id {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticket.requester.id.changed",
                        }
                    }
                    export namespace name {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticket.requester.name.changed",
                        }
                    }
                }
                export namespace sharedWith {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.sharedWith.changed",
                    }
                }
                export namespace status {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.status.changed",
                    }
                }
                export namespace statusCategory {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.statusCategory.changed",
                    }
                }
                export namespace subject {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.subject.changed",
                    }
                }
                export namespace tags {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.tags.changed",
                    }
                }
                export namespace type {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.type.changed",
                    }
                }

                export function custom_field(identifier: string): {
                    changed: ZendeskEvent<() => void | Promise<void>>
                } {
                    return {
                        changed: {
                            _path: `ticket.custom_field_${identifier}.changed`,
                        },
                    }
                }

                export function customStatus(identifier: string): {
                    changed: ZendeskEvent<() => void | Promise<void>>
                } {
                    return {
                        changed: { _path: `ticket.${identifier}.changed` },
                    }
                }

                export namespace submit {
                    export const start: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.submit.start",
                    }
                    export const done: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.submit.done",
                    }
                    export const fail: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.submit.fail",
                    }
                    export const always: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "ticket.submit.always",
                    }
                }

                export const updated: ZendeskEvent<
                    (user: User) => void | Promise<void>
                > = { _path: "ticket.updated" }

                export namespace viewers {
                    export const changed: ZendeskEvent<
                        (users: CollisionUser[]) => void | Promise<void>
                    > = { _path: "ticket.type.changed" }
                }

                export const save: ZendeskEvent<
                    () => boolean | string | Promise<boolean | string>
                > = { _path: "ticket.save" }
            }

            export namespace channel {
                export const changed: ZendeskEvent<() => void | Promise<void>> =
                    {
                        _path: "channel.changed",
                    }
            }

            export namespace ticketFields {
                export namespace assignee {
                    export namespace optionValues {
                        export const changed: ZendeskEvent<
                            () => void | Promise<void>
                        > = {
                            _path: "ticketFields.assignee.optionValues.changed",
                        }
                    }
                }
            }

            export namespace comment {
                export namespace text {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "comment.text.changed",
                    }
                }
                export namespace type {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "comment.type.changed",
                    }
                }
                export namespace attachments {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "comment.attachments.changed",
                    }
                }
            }

            export namespace anything {
                export const changed: ZendeskEvent<
                    (e: {
                        propertyName: string
                        newValue: any
                    }) => void | Promise<void>
                > = { _path: "*.changed" }
            }
        }

        export namespace Objects {
            export const ticket: ZendeskObject<Ticket> = {
                _path: "ticket",
                assignee: {
                    _path: "ticket.assignee",
                    _writeType: { groupId: "", userId: "" },
                    group: {
                        _path: "ticket.assignee.group",
                        id: { _path: "ticket.assignee.group.id" },
                        name: { _path: "ticket.assignee.group.name" },
                    },
                    user: {
                        _path: "ticket.assignee.user",
                        id: { _path: "ticket.assignee.user.id" },
                        email: { _path: "ticket.assignee.user.email" },
                        groups: newIndexable(
                            "ticket.assignee.user.groups",
                            (i) => {
                                return {
                                    _path: `ticket.assignee.user.groups${i}`,
                                    id: {
                                        _path: `ticket.assignee.user.groups${i}.id`,
                                    },
                                    name: {
                                        _path: `ticket.assignee.user.groups${i}.name`,
                                    },
                                }
                            },
                        ),
                        organizations: newIndexable(
                            "ticket.assignee.user.organizations",
                            (identifier) => {
                                return {
                                    _path: `ticket.assignee.user.organizations${identifier}`,
                                    name: {
                                        _path: `ticket.assignee.user.organizations${identifier}.name`,
                                    },
                                    id: {
                                        _path: `ticket.assignee.user.organizations${identifier}.id`,
                                    },
                                    tags: newIndexable(
                                        `ticket.assignee.user.organizations${identifier}.tags`,
                                        (identifier2) => {
                                            return {
                                                _path: `ticket.assignee.user.organizations${identifier}.tags${identifier2}`,
                                            }
                                        },
                                    ),
                                    group: {
                                        _path: `ticket.assignee.user.organizations${identifier}.group`,
                                        id: {
                                            _path: `ticket.assignee.user.organizations${identifier}.group.id`,
                                        },
                                        name: {
                                            _path: `ticket.assignee.user.organizations${identifier}.group.name`,
                                        },
                                    },
                                    sharedComments: {
                                        _path: `ticket.assignee.user.organizations${identifier}.sharedComments`,
                                    },
                                    sharedTickets: {
                                        _path: `ticket.assignee.user.organizations${identifier}.sharedTickets`,
                                    },
                                    externalId: {
                                        _path: `ticket.assignee.user.organizations${identifier}.externalId`,
                                        _writeType: "",
                                    },
                                    details: {
                                        _path: `ticket.assignee.user.organizations${identifier}.details`,
                                        _writeType: "",
                                    },
                                    notes: {
                                        _path: `ticket.assignee.user.organizations${identifier}.notes`,
                                        _writeType: "",
                                    },
                                    domains: {
                                        _path: `ticket.assignee.user.organizations${identifier}.group.domains`,
                                        _writeType: "",
                                    },
                                }
                            },
                        ),
                        identities: newIndexable(
                            "ticket.assignee.user.identities",
                            (i) => {
                                return {
                                    _path: `ticket.assignee.user.identities${i}`,
                                    id: {
                                        _path: `ticket.assignee.user.identities${i}.id`,
                                    },
                                    type: {
                                        _path: `ticket.assignee.user.identities${i}.type`,
                                    },
                                    value: {
                                        _path: `ticket.assignee.user.identities${i}.value`,
                                    },
                                    verified: {
                                        _path: `ticket.assignee.user.identities${i}.verified`,
                                    },
                                    primary: {
                                        _path: `ticket.assignee.user.identities${i}.primary`,
                                    },
                                    userId: {
                                        _path: `ticket.assignee.user.identities${i}.userId`,
                                    },
                                    undeliverableCount: {
                                        _path: `ticket.assignee.user.identities${i}.undeliverableCount`,
                                    },
                                    deliverableState: {
                                        _path: `ticket.assignee.user.identities${i}.deliverableState`,
                                    },
                                }
                            },
                        ),
                        name: { _path: "ticket.assignee.user.name" },
                        role: { _path: "ticket.assignee.user.role" },
                        externalId: {
                            _path: "ticket.assignee.user.externalId",
                            _writeType: "",
                        },
                        locale: { _path: "ticket.assignee.user.locale" },
                        details: {
                            _path: "ticket.assignee.user.details",
                            _writeType: "",
                        },
                        notes: {
                            _path: "ticket.assignee.user.notes",
                            _writeType: "",
                        },
                        alias: {
                            _path: "ticket.assignee.user.alias",
                            _writeType: "",
                        },
                        signature: {
                            _path: "ticket.assignee.user.signature",
                            _writeType: "",
                        },
                        timeZone: {
                            _path: "ticket.assignee.user.timeZone",
                            name: {
                                _path: "ticket.assignee.user.timeZone.name",
                            },
                            translatedName: {
                                _path: "ticket.assignee.user.timeZone.translatedName",
                            },
                            ianaName: {
                                _path: "ticket.assignee.user.timeZone.ianaName",
                            },
                            offset: {
                                _path: "ticket.assignee.user.timeZone.ianaName",
                            },
                            FormattedOffset: {
                                _path: "ticket.assignee.user.timeZone.formattedOffset",
                            },
                        },
                        tags: newIndexable("ticket.assignee.user.tags", (i) => {
                            return { _path: `ticket.assignee.user.tags${i}` }
                        }),
                        avatarUrl: { _path: "ticket.assignee.user.avatarUrl" },
                    },
                },
                brand: {
                    _path: "ticket.brand",
                    _writeType: { id: "" },
                    hasHelpCenter: { _path: "ticket.brand.hasHelpCenter" },
                    id: { _path: "ticket.brand.id" },
                    isDefault: { _path: "ticket.brand.isDefault" },
                    isActive: { _path: "ticket.brand.isActive" },
                    logo: {
                        _path: "ticket.brand.logo",
                        contentType: { _path: "ticket.brand.logo.contentType" },
                        contentUrl: { _path: "ticket.brand.logo.contentUrl" },
                        filename: { _path: "ticket.brand.logo.filename" },
                    },
                    name: { _path: "ticket.brand.name" },
                    subdomain: { _path: "ticket.brand.subdomain" },
                    url: { _path: "ticket.brand.url" },
                },
                collaborators: newIndexable("ticket.collaborators", (i) => {
                    return {
                        _path: `ticket.collaborators${i}`,
                        timeZone: {
                            _path: `ticket.collaborators${i}.timeZone`,
                            name: {
                                _path: `ticket.collaborators${i}.timeZone.name`,
                            },
                            translatedName: {
                                _path: `ticket.collaborators${i}.timeZone.translatedName`,
                            },
                            ianaName: {
                                _path: `ticket.collaborators${i}.timeZone.ianaName`,
                            },
                            offset: {
                                _path: `ticket.collaborators${i}.timeZone.offset`,
                            },
                            FormattedOffset: {
                                _path: `ticket.collaborators${i}.timeZone.FormattedOffset`,
                            },
                        },
                        name: { _path: `ticket.collaborators${i}.name` },
                        id: { _path: `ticket.collaborators${i}.id` },
                        email: { _path: `ticket.collaborators${i}.email` },
                        role: { _path: `ticket.collaborators${i}.role` },
                        locale: { _path: `ticket.collaborators${i}.locale` },
                        avatarUrl: {
                            _path: `ticket.collaborators${i}.avatarUrl`,
                        },
                        externalId: {
                            _path: `ticket.collaborators${i}.externalId`,
                            _writeType: "",
                        },
                        details: {
                            _path: `ticket.collaborators${i}.details`,
                            _writeType: "",
                        },
                        notes: {
                            _path: `ticket.collaborators${i}.notes`,
                            _writeType: "",
                        },
                        alias: {
                            _path: `ticket.collaborators${i}.alias`,
                            _writeType: "",
                        },
                        signature: {
                            _path: `ticket.collaborators${i}.signature`,
                            _writeType: "",
                        },
                        organizations: newIndexable(
                            `ticket.collaborators${i}.organizations`,
                            (j) => {
                                return {
                                    _path: `ticket.collaborators${i}.organizations${j}`,
                                    name: {
                                        _path: `ticket.collaborators${i}.organizations${j}.name`,
                                    },
                                    id: {
                                        _path: `ticket.collaborators${i}.organizations${j}.id`,
                                    },
                                    tags: newIndexable(
                                        `ticket.collaborators${i}.organizations${j}.tags`,
                                        (k) => {
                                            return {
                                                _path: `ticket.collaborators${i}.organizations${j}.tags${k}`,
                                            }
                                        },
                                    ),
                                    group: {
                                        _path: `ticket.collaborators${i}.organizations${j}.group`,
                                        id: {
                                            _path: `ticket.collaborators${i}.organizations${j}.group.id`,
                                        },
                                        name: {
                                            _path: `ticket.collaborators${i}.organizations${j}.group.name`,
                                        },
                                    },
                                    sharedComments: {
                                        _path: `ticket.collaborators${i}.organizations${j}.sharedComments`,
                                    },
                                    sharedTickets: {
                                        _path: `ticket.collaborators${i}.organizations${j}.sharedTickets`,
                                    },
                                    externalId: {
                                        _path: `ticket.collaborators${i}.organizations${j}.externalId`,
                                        _writeType: "",
                                    },
                                    details: {
                                        _path: `ticket.collaborators${i}.organizations${j}.details`,
                                        _writeType: "",
                                    },
                                    notes: {
                                        _path: `ticket.collaborators${i}.organizations${j}.notes`,
                                        _writeType: "",
                                    },
                                    domains: {
                                        _path: `ticket.collaborators${i}.organizations${j}.group.domains`,
                                        _writeType: "",
                                    },
                                }
                            },
                        ),
                        tags: newIndexable(
                            `ticket.collaborators${i}.tags`,
                            (j) => {
                                return {
                                    _path: `ticket.collaborators${i}.tags${j}`,
                                }
                            },
                        ),
                        identities: newIndexable(
                            `ticket.collaborators${i}.identities`,
                            (j) => {
                                return {
                                    _path: `ticket.collaborators${i}.identities${j}`,
                                    id: {
                                        _path: `ticket.collaborators${i}.identities${j}.id`,
                                    },
                                    type: {
                                        _path: `ticket.collaborators${i}.identities${j}.type`,
                                    },
                                    value: {
                                        _path: `ticket.collaborators${i}.identities${j}.value`,
                                    },
                                    verified: {
                                        _path: `ticket.collaborators${i}.identities${j}.verified`,
                                    },
                                    primary: {
                                        _path: `ticket.collaborators${i}.identities${j}.primary`,
                                    },
                                    userId: {
                                        _path: `ticket.collaborators${i}.identities${j}.userId`,
                                    },
                                    undeliverableCount: {
                                        _path: `ticket.collaborators${i}.identities${j}.undeliverableCount`,
                                    },
                                    deliverableState: {
                                        _path: `ticket.collaborators${i}.identities${j}.deliverableState`,
                                    },
                                }
                            },
                        ),
                        groups: newIndexable(
                            `ticket.collaborators${i}.groups`,
                            (j) => {
                                return {
                                    _path: `ticket.collaborators${i}.groups:${j}`,
                                    name: {
                                        _path: `ticket.collaborators${i}.groups:${j}.name`,
                                    },
                                    id: {
                                        _path: `ticket.collaborators${i}.groups:${j}.id`,
                                    },
                                }
                            },
                        ),
                    }
                }),
                comment: {
                    _path: "ticket.comment",
                    attachments: newIndexable(
                        "ticket.comment.attachments",
                        (i) => {
                            return {
                                _path: `ticket.comment.attachments${i}`,
                                contentType: {
                                    _path: `ticket.comment.attachments${i}.contentType`,
                                },
                                contentUrl: {
                                    _path: `ticket.comment.attachments${i}.contentUrl`,
                                },
                                fileName: {
                                    _path: `ticket.comment.attachments${i}.fileName`,
                                },
                                thumbnailUrl: {
                                    _path: `ticket.comment.attachments${i}.thumbnailUrl`,
                                },
                            }
                        },
                    ),
                    text: { _path: "ticket.comment.text", _writeType: "" },
                    type: {
                        _path: "ticket.comment.type",
                        _writeType: {} as CommentType,
                    },
                    useRichText: { _path: "ticket.comment.useRichText" },
                },
                comments: newIndexable("ticket.comments", (i) => {
                    return {
                        _path: `ticket.comments${i}`,
                        id: { _path: `ticket.comments${i}.id` },
                        value: { _path: `ticket.comments${i}.value` },
                        via: {
                            _path: `ticket.comments${i}.via`,
                            channel: {
                                _path: `ticket.comments${i}.via.channel`,
                            },
                            source: {
                                _path: `ticket.comments${i}.via.source`,
                                from: {
                                    _path: `ticket.comments${i}.via.source.from`,
                                },
                                to: {
                                    _path: `ticket.comments${i}.via.source.to`,
                                },
                                rel: {
                                    _path: `ticket.comments${i}.via.source.rel`,
                                },
                            },
                        },
                        author: {
                            _path: `ticket.comments${i}.author`,
                            id: { _path: `ticket.comments${i}.author.id` },
                            email: {
                                _path: `ticket.comments${i}.author.email`,
                            },
                            groups: newIndexable(
                                `ticket.comments${i}.author.groups`,
                                (j) => {
                                    return {
                                        _path: `ticket.comments${i}.author.groups${j}`,
                                        id: {
                                            _path: `ticket.comments${i}.author.groups${j}.id`,
                                        },
                                        name: {
                                            _path: `ticket.comments${i}.author.groups${j}.name`,
                                        },
                                    }
                                },
                            ),
                            organizations: newIndexable(
                                `ticket.comments${i}.author.organizations`,
                                (j) => {
                                    return {
                                        _path: `ticket.comments${i}.author.organizations${j}`,
                                        name: {
                                            _path: `ticket.comments${i}.author.organizations${j}.name`,
                                        },
                                        id: {
                                            _path: `ticket.comments${i}.author.organizations${j}.id`,
                                        },
                                        tags: newIndexable(
                                            `ticket.comments${i}.author.organizations${j}.tags`,
                                            (identifier2) => {
                                                return {
                                                    _path: `ticket.comments${i}.author.organizations${j}.tags${identifier2}`,
                                                }
                                            },
                                        ),
                                        group: {
                                            _path: `ticket.comments${i}.author.organizations${j}.group`,
                                            id: {
                                                _path: `ticket.comments${i}.author.organizations${j}.group.id`,
                                            },
                                            name: {
                                                _path: `ticket.comments${i}.author.organizations${j}.group.name`,
                                            },
                                        },
                                        sharedComments: {
                                            _path: `ticket.comments${i}.author.organizations${j}.sharedComments`,
                                        },
                                        sharedTickets: {
                                            _path: `ticket.comments${i}.author.organizations${j}.sharedTickets`,
                                        },
                                        externalId: {
                                            _path: `ticket.comments${i}.author.organizations${j}.externalId`,
                                            _writeType: ``,
                                        },
                                        details: {
                                            _path: `ticket.comments${i}.author.organizations${j}.details`,
                                            _writeType: ``,
                                        },
                                        notes: {
                                            _path: `ticket.comments${i}.author.organizations${j}.notes`,
                                            _writeType: ``,
                                        },
                                        domains: {
                                            _path: `ticket.comments${i}.author.organizations${j}.group.domains`,
                                            _writeType: ``,
                                        },
                                    }
                                },
                            ),
                            identities: newIndexable(
                                `ticket.comments${i}.author.identities`,
                                (j) => {
                                    return {
                                        _path: `ticket.comments${i}.author.identities${j}`,
                                        id: {
                                            _path: `ticket.comments${i}.author.identities${j}.id`,
                                        },
                                        type: {
                                            _path: `ticket.comments${i}.author.identities${j}.type`,
                                        },
                                        value: {
                                            _path: `ticket.comments${i}.author.identities${j}.value`,
                                        },
                                        verified: {
                                            _path: `ticket.comments${i}.author.identities${j}.verified`,
                                        },
                                        primary: {
                                            _path: `ticket.comments${i}.author.identities${j}.primary`,
                                        },
                                        userId: {
                                            _path: `ticket.comments${i}.author.identities${j}.userId`,
                                        },
                                        undeliverableCount: {
                                            _path: `ticket.comments${i}.author.identities${j}.undeliverableCount`,
                                        },
                                        deliverableState: {
                                            _path: `ticket.comments${i}.author.identities${j}.deliverableState`,
                                        },
                                    }
                                },
                            ),
                            name: { _path: `ticket.comments${i}.author.name` },
                            role: { _path: `ticket.comments${i}.author.role` },
                            externalId: {
                                _path: `ticket.comments${i}.author.externalId`,
                                _writeType: ``,
                            },
                            locale: {
                                _path: `ticket.comments${i}.author.locale`,
                            },
                            details: {
                                _path: `ticket.comments${i}.author.details`,
                                _writeType: ``,
                            },
                            notes: {
                                _path: `ticket.comments${i}.author.notes`,
                                _writeType: ``,
                            },
                            alias: {
                                _path: `ticket.comments${i}.author.alias`,
                                _writeType: ``,
                            },
                            signature: {
                                _path: `ticket.comments${i}.author.signature`,
                                _writeType: ``,
                            },
                            timeZone: {
                                _path: `ticket.comments${i}.author.timeZone`,
                                name: {
                                    _path: `ticket.comments${i}.author.timeZone.name`,
                                },
                                translatedName: {
                                    _path: `ticket.comments${i}.author.timeZone.translatedName`,
                                },
                                ianaName: {
                                    _path: `ticket.comments${i}.author.timeZone.ianaName`,
                                },
                                offset: {
                                    _path: `ticket.comments${i}.author.timeZone.ianaName`,
                                },
                                FormattedOffset: {
                                    _path: `ticket.comments${i}.author.timeZone.formattedOffset`,
                                },
                            },
                            tags: newIndexable(
                                `ticket.comments${i}.author.tags`,
                                (j) => {
                                    return {
                                        _path: `ticket.comments${i}.author.tags${j}`,
                                    }
                                },
                            ),
                            avatarUrl: {
                                _path: `ticket.comments${i}.author.avatarUrl`,
                            },
                        },
                        imageAttachments: newIndexable(
                            `ticket.comments${i}.imageAttachments`,
                            (j) => {
                                return {
                                    _path: `ticket.comments${i}.imageAttachments${j}`,
                                    contentType: {
                                        _path: `ticket.comments${i}.imageAttachments${j}.contentType`,
                                    },
                                    contentUrl: {
                                        _path: `ticket.comments${i}.imageAttachments${j}.contentUrl`,
                                    },
                                    fileName: {
                                        _path: `ticket.comments${i}.imageAttachments${j}.fileName`,
                                    },
                                    thumbnailUrl: {
                                        _path: `ticket.comments${i}.imageAttachments${j}.thumbnailUrl`,
                                    },
                                }
                            },
                        ),
                        nonImageAttachments: newIndexable(
                            `ticket.comments${i}.nonImageAttachments`,
                            (j) => {
                                return {
                                    _path: `ticket.comments${i}.nonImageAttachments${j}`,
                                    contentType: {
                                        _path: `ticket.comments${i}.nonImageAttachments${j}.contentType`,
                                    },
                                    contentUrl: {
                                        _path: `ticket.comments${i}.nonImageAttachments${j}.contentUrl`,
                                    },
                                    fileName: {
                                        _path: `ticket.comments${i}.nonImageAttachments${j}.fileName`,
                                    },
                                    thumbnailUrl: {
                                        _path: `ticket.comments${i}.nonImageAttachments${j}.thumbnailUrl`,
                                    },
                                }
                            },
                        ),
                    }
                }),
                conversation: newIndexable("ticket.conversation", (i) => {
                    return {
                        _path: `ticket.conversation${i}`,
                        author: {
                            _path: `ticket.conversation${i}.author`,
                            id: { _path: `ticket.conversation${i}.author.id` },
                            avatar: {
                                _path: `ticket.conversation${i}.author.avatar`,
                            },
                            name: {
                                _path: `ticket.conversation${i}.author.name`,
                            },
                            role: {
                                _path: `ticket.conversation${i}.author.role`,
                            },
                        },
                        attachments: newIndexable(
                            `ticket.conversation${i}.attachments`,
                            (j) => {
                                return {
                                    _path: `ticket.conversation${i}.attachments${j}`,
                                    contentType: {
                                        _path: `ticket.conversation${i}.attachments${j}.contentType`,
                                    },
                                    contentUrl: {
                                        _path: `ticket.conversation${i}.attachments${j}.contentUrl`,
                                    },
                                    filename: {
                                        _path: `ticket.conversation${i}.attachments${j}.filename`,
                                    },
                                }
                            },
                        ),
                        channel: {
                            _path: `ticket.conversation${i}.channel`,
                            name: {
                                _path: `ticket.conversation${i}.channel.name`,
                            },
                        },
                        timestamp: {
                            _path: `ticket.conversation${i}.timestamp`,
                        },
                        message: {
                            _path: `ticket.conversation${i}.message`,
                            content: {
                                _path: `ticket.conversation${i}.message.content`,
                            },
                            contentType: {
                                _path: `ticket.conversation${i}.message.contentType`,
                            },
                        },
                    }
                }),
                createdAt: { _path: "ticket.createdAt" },
                description: { _path: "ticket.description" },
                externalId: {
                    _path: "ticket.externalId",
                    _writeType: "",
                },
                form: {
                    _path: "ticket.form",
                    id: { _path: "ticket.form.id", _writeType: 0 },
                },
                id: { _path: "ticket.id" },
                isNew: { _path: "ticket.isNew" },
                organization: {
                    _path: "ticket.organization",
                    details: {
                        _path: "ticket.organization.details",
                        _writeType: "",
                    },
                    domains: {
                        _path: "ticket.organization.domains",
                        _writeType: "",
                    },
                    externalId: {
                        _path: "ticket.organization.externalId",
                        _writeType: "",
                    },
                    group: {
                        _path: "ticket.organization.group",
                        id: { _path: "ticket.organization.id" },
                        name: { _path: "ticket.organization.name" },
                    },
                    id: { _path: "ticket.organization.id" },
                    name: { _path: "ticket.organization.name" },
                    notes: {
                        _path: "ticket.organization.notes",
                        _writeType: "",
                    },
                    sharedComments: {
                        _path: "ticket.organization.sharedComments",
                    },
                    sharedTickets: {
                        _path: "ticket.organization.sharedTickets",
                    },
                    tags: newIndexable("ticket.organization.tags", (i) => {
                        return {
                            _path: `ticket.organization.tags${i}`,
                        }
                    }),
                    custom_field: <T>(identifier: string) => {
                        return {
                            _path:
                                "ticket.organization.customField:custom_field_" +
                                identifier,
                            _writeType: {} as T,
                        }
                    },
                },
                postSaveAction: { _path: "ticket.postSaveAction" },
                priority: {
                    _path: "ticket.priority",
                    _writeType: {} as Priority,
                },
                recipient: { _path: "ticket.recipient", _writeType: "" },
                requester: {
                    _path: "ticket.requester",
                    _writeType: { email: "", name: "" },
                    id: { _path: "ticket.requester.id" },
                    email: { _path: "ticket.requester.email" },
                    groups: newIndexable("ticket.requester.groups", (i) => {
                        return {
                            _path: `ticket.requester.groups${i}`,
                            name: { _path: `ticket.requester.groups${i}.name` },
                            id: { _path: `ticket.requester.groups${i}.id` },
                        }
                    }),
                    organizations: newIndexable(
                        `ticket.requester.organizations`,
                        (i) => {
                            return {
                                _path: `ticket.requester.organizations${i}`,
                                name: {
                                    _path: `ticket.requester.organizations${i}.name`,
                                },
                                id: {
                                    _path: `ticket.requester.organizations${i}.id`,
                                },
                                tags: newIndexable(
                                    `ticket.requester.organizations${i}.tags`,
                                    (identifier2) => {
                                        return {
                                            _path: `ticket.requester.organizations${i}.tags${identifier2}`,
                                        }
                                    },
                                ),
                                group: {
                                    _path: `ticket.requester.organizations${i}.group`,
                                    id: {
                                        _path: `ticket.requester.organizations${i}.group.id`,
                                    },
                                    name: {
                                        _path: `ticket.requester.organizations${i}.group.name`,
                                    },
                                },
                                sharedComments: {
                                    _path: `ticket.requester.organizations${i}.sharedComments`,
                                },
                                sharedTickets: {
                                    _path: `ticket.requester.organizations${i}.sharedTickets`,
                                },
                                externalId: {
                                    _path: `ticket.requester.organizations${i}.externalId`,
                                    _writeType: ``,
                                },
                                details: {
                                    _path: `ticket.requester.organizations${i}.details`,
                                    _writeType: ``,
                                },
                                notes: {
                                    _path: `ticket.requester.organizations${i}.notes`,
                                    _writeType: ``,
                                },
                                domains: {
                                    _path: `ticket.requester.organizations${i}.group.domains`,
                                    _writeType: ``,
                                },
                            }
                        },
                    ),
                    identities: newIndexable(
                        "ticket.requester.identities",
                        (i) => {
                            return {
                                _path: `ticket.requester.identities${i}`,
                                id: {
                                    _path: `ticket.requester.identities${i}.id`,
                                },
                                type: {
                                    _path: `ticket.requester.identities${i}.type`,
                                },
                                value: {
                                    _path: `ticket.requester.identities${i}.value`,
                                },
                                verified: {
                                    _path: `ticket.requester.identities${i}.verified`,
                                },
                                primary: {
                                    _path: `ticket.requester.identities${i}.primary`,
                                },
                                userId: {
                                    _path: `ticket.requester.identities${i}.userId`,
                                },
                                undeliverableCount: {
                                    _path: `ticket.requester.identities${i}.undeliverableCount`,
                                },
                                deliverableState: {
                                    _path: `ticket.requester.identities${i}.deliverableState`,
                                },
                            }
                        },
                    ),
                    name: { _path: "ticket.requester.name" },
                    role: { _path: "ticket.requester.role" },
                    externalId: {
                        _path: "ticket.requester.externalId",
                        _writeType: "",
                    },
                    locale: { _path: "ticket.requester.locale" },
                    details: {
                        _path: "ticket.requester.details",
                        _writeType: "",
                    },
                    notes: { _path: "ticket.requester.notes", _writeType: "" },
                    alias: { _path: "ticket.requester.alias", _writeType: "" },
                    signature: {
                        _path: "ticket.requester.signature",
                        _writeType: "",
                    },
                    timeZone: {
                        _path: "ticket.requester.timeZone",
                        name: { _path: "ticket.requester.timeZone.name" },
                        translatedName: {
                            _path: "ticket.requester.timeZone.translatedName",
                        },
                        ianaName: {
                            _path: "ticket.requester.timeZone.ianaName",
                        },
                        offset: { _path: "ticket.requester.timeZone.ianaName" },
                        FormattedOffset: {
                            _path: "ticket.requester.timeZone.formattedOffset",
                        },
                    },
                    tags: newIndexable("ticket.requester.tags", (i) => {
                        return { _path: `ticket.requester.tags${i}` }
                    }),
                    avatarUrl: { _path: "ticket.requester.avatarUrl" },
                },
                sharedWith: {
                    _path: "ticket.sharedWith",
                    _writeType: { id: "" },
                    id: { _path: "ticket.sharedWith.id" },
                    name: { _path: "ticket.sharedWith.name" },
                    partnerName: { _path: "ticket.sharedWith.partnerName" },
                },
                status: {
                    _path: "ticket.status",
                    _writeType: {} as TicketStatus,
                },
                statusCategory: {
                    _path: "ticket.statusCategory",
                    _writeType: "",
                },
                subject: { _path: "ticket.subject", _writeType: "" },
                tags: { _path: "ticket.tags", _writeType: [] },
                type: { _path: "ticket.type", _writeType: "" as TicketType },
                updatedAt: { _path: "ticket.updatedAt" },
                via: {
                    _path: "ticket.via",
                    channel: { _path: "ticket.via.channel" },
                    source: {
                        _path: "ticket.via.source",
                        from: { _path: "ticket.via.source.from" },
                        to: { _path: "ticket.via.source.to" },
                        rel: { _path: "ticket.via.source.rel" },
                    },
                },
                viewers: newIndexable("ticket.viewers", (i) => {
                    return {
                        _path: `ticket.viewers${i}`,
                        timeZone: {
                            _path: `ticket.viewers${i}.timeZone`,
                            name: { _path: `ticket.viewers${i}.timeZone.name` },
                            translatedName: {
                                _path: `ticket.viewers${i}.timeZone.translatedName`,
                            },
                            ianaName: {
                                _path: `ticket.viewers${i}.timeZone.ianaName`,
                            },
                            offset: {
                                _path: `ticket.viewers${i}.timeZone.offset`,
                            },
                            FormattedOffset: {
                                _path: `ticket.viewers${i}.timeZone.FormattedOffset`,
                            },
                        },
                        name: { _path: `ticket.viewers${i}.name` },
                        id: { _path: `ticket.viewers${i}.id` },
                        email: { _path: `ticket.viewers${i}.email` },
                        role: { _path: `ticket.viewers${i}.role` },
                        locale: { _path: `ticket.viewers${i}.locale` },
                        avatarUrl: { _path: `ticket.viewers${i}.avatarUrl` },
                        externalId: {
                            _path: `ticket.viewers${i}.externalId`,
                            _writeType: "",
                        },
                        details: {
                            _path: `ticket.viewers${i}.details`,
                            _writeType: "",
                        },
                        notes: {
                            _path: `ticket.viewers${i}.notes`,
                            _writeType: "",
                        },
                        alias: {
                            _path: `ticket.viewers${i}.alias`,
                            _writeType: "",
                        },
                        signature: {
                            _path: `ticket.viewers${i}.signature`,
                            _writeType: "",
                        },
                        organizations: newIndexable(
                            `ticket.viewers${i}.organizations`,
                            (j) => {
                                return {
                                    _path: `ticket.viewers${i}.organizations${j}`,
                                    name: {
                                        _path: `ticket.viewers${i}.organizations${j}.name`,
                                    },
                                    id: {
                                        _path: `ticket.viewers${i}.organizations${j}.id`,
                                    },
                                    tags: newIndexable(
                                        `ticket.viewers${i}.organizations${j}.tags`,
                                        (k) => {
                                            return {
                                                _path: `ticket.viewers${i}.organizations${j}.tags${k}`,
                                            }
                                        },
                                    ),
                                    group: {
                                        _path: `ticket.viewers${i}.organizations${j}.group`,
                                        id: {
                                            _path: `ticket.viewers${i}.organizations${j}.group.id`,
                                        },
                                        name: {
                                            _path: `ticket.viewers${i}.organizations${j}.group.name`,
                                        },
                                    },
                                    sharedComments: {
                                        _path: `ticket.viewers${i}.organizations${j}.sharedComments`,
                                    },
                                    sharedTickets: {
                                        _path: `ticket.viewers${i}.organizations${j}.sharedTickets`,
                                    },
                                    externalId: {
                                        _path: `ticket.viewers${i}.organizations${j}.externalId`,
                                        _writeType: "",
                                    },
                                    details: {
                                        _path: `ticket.viewers${i}.organizations${j}.details`,
                                        _writeType: "",
                                    },
                                    notes: {
                                        _path: `ticket.viewers${i}.organizations${j}.notes`,
                                        _writeType: "",
                                    },
                                    domains: {
                                        _path: `ticket.viewers${i}.organizations${j}.group.domains`,
                                        _writeType: "",
                                    },
                                }
                            },
                        ),
                        tags: newIndexable(`ticket.viewers${i}.tags`, (j) => {
                            return {
                                _path: `ticket.viewers${i}.tags${j}`,
                            }
                        }),
                        identities: newIndexable(
                            `ticket.viewers${i}.identities`,
                            (j) => {
                                return {
                                    _path: `ticket.viewers${i}.identities${j}`,
                                    id: {
                                        _path: `ticket.viewers${i}.identities${j}.id`,
                                    },
                                    type: {
                                        _path: `ticket.viewers${i}.identities${j}.type`,
                                    },
                                    value: {
                                        _path: `ticket.viewers${i}.identities${j}.value`,
                                    },
                                    verified: {
                                        _path: `ticket.viewers${i}.identities${j}.verified`,
                                    },
                                    primary: {
                                        _path: `ticket.viewers${i}.identities${j}.primary`,
                                    },
                                    userId: {
                                        _path: `ticket.viewers${i}.identities${j}.userId`,
                                    },
                                    undeliverableCount: {
                                        _path: `ticket.viewers${i}.identities${j}.undeliverableCount`,
                                    },
                                    deliverableState: {
                                        _path: `ticket.viewers${i}.identities${j}.deliverableState`,
                                    },
                                }
                            },
                        ),
                        groups: newIndexable(
                            `ticket.viewers${i}.groups`,
                            (j) => {
                                return {
                                    _path: `ticket.viewers${i}.groups:${j}`,
                                    name: {
                                        _path: `ticket.viewers${i}.groups:${j}.name`,
                                    },
                                    id: {
                                        _path: `ticket.viewers${i}.groups:${j}.id`,
                                    },
                                }
                            },
                        ),
                        isEditing: { _path: `ticket.viewers${i}.isEditing` },
                        isIdle: { _path: `ticket.viewers${i}.isIdle` },
                    }
                }),
                custom_field: <T>(identifier: string) => {
                    return {
                        _path: "ticket.customField:custom_field_" + identifier,
                        _writeType: {} as T,
                    }
                },
            }

            export const channel: ZendeskObject<Channel> = {
                _path: "channel",
                name: { _path: "channel.name" },
                sessionBased: { _path: "channel.sessionBased" },
                sessionActive: { _path: "channel.sessionActive" },
            }

            export const comment: ZendeskObject<Comment> = {
                _path: "comment",
                attachments: newIndexable("comment.attachments", (i) => {
                    return {
                        _path: `comment.attachments${i}`,
                        contentType: {
                            _path: `comment.attachments${i}.contentType`,
                        },
                        contentUrl: {
                            _path: `comment.attachments${i}.contentUrl`,
                        },
                        thumbnailUrl: {
                            _path: `comment.attachments${i}.thumbnailUrl`,
                        },
                        fileName: { _path: `comment.attachments${i}.fileName` },
                    }
                }),
                useRichText: { _path: "comment.useRichText" },
                type: { _path: "comment.type", _writeType: "" as CommentType },
                text: { _path: "comment.text", _writeType: "" },
            }

            export const ticketFields = newIndexable("ticketFields", (i) => {
                return { _path: `ticketFields${i}` }
            })

            export const macros = newIndexable("macros", (i) => {
                return { _path: `macros${i}` }
            })
        }

        export namespace Actions {
            export const ticket: ZendeskActionPath<Ticket> = {
                addCollaborator: { _path: "ticket.collaborators.add" },
                removeCollaborator: { _path: "ticket.collaborators.remove" },
                sendMessage: { _path: "ticket.sendMessage" },
                addTags: { _path: "ticket.tags.add" },
                removeTags: { _path: "ticket.tags.remove" },
                comment: {
                    appendHtml: { _path: "ticket.comment.appendHtml" },
                    appendMarkdown: { _path: "ticket.comment.appendMarkdown" },
                    appendText: { _path: "ticket.comment.appendText" },
                },
            }

            export const comment: ZendeskActionPath<Comment> = {
                appendHtml: { _path: "comment.appendHtml" },
                appendMarkdown: { _path: "comment.appendMarkdown" },
                appendText: { _path: "comment.appendText" },
            }

            export const macro: ZendeskAction<
                (id: number) => void | Promise<void>
            > = {
                _path: "macro",
            }

            export const enableSave: ZendeskAction<EnableSave> = {
                _path: "enableSave",
            }

            export const disableSave: ZendeskAction<DisableSave> = {
                _path: "disableSave",
            }

            export const ticketFields = newIndexableActionPath<TicketField[]>(
                (i) => {
                    return {
                        show: { _path: `ticketFields${i}.show` },
                        hide: { _path: `ticketFields${i}.hide` },
                        toggle: { _path: `ticketFields${i}.toggle` },
                        enable: { _path: `ticketFields${i}.enable` },
                        disable: { _path: `ticketFields${i}.disable` },
                        optionValues: newIndexableActionPath((j) => {
                            return {
                                show: {
                                    _path: `ticketFields${i}.optionValues${j}.show`,
                                },
                                hide: {
                                    _path: `ticketFields${i}.optionValues${j}.hide`,
                                },
                                toggle: {
                                    _path: `ticketFields${i}.optionValues${j}.toggle`,
                                },
                                enable: {
                                    _path: `ticketFields${i}.optionValues${j}.enable`,
                                },
                                disable: {
                                    _path: `ticketFields${i}.optionValues${j}.disable`,
                                },
                            }
                        }),
                        optionGroups: newIndexableActionPath((j) => {
                            return {
                                show: {
                                    _path: `ticketFields${i}.optionGroups${j}.show`,
                                },
                                hide: {
                                    _path: `ticketFields${i}.optionGroups${j}.hide`,
                                },
                                toggle: {
                                    _path: `ticketFields${i}.optionGroups${j}.toggle`,
                                },
                                enable: {
                                    _path: `ticketFields${i}.optionGroups${j}.enable`,
                                },
                                disable: {
                                    _path: `ticketFields${i}.optionGroups${j}.disable`,
                                },
                            }
                        }),
                    }
                },
            )
        }
    }

    export namespace UserSidebar {
        export namespace Objects {
            export const user: ZendeskObject<User> = {
                _path: "user",
                id: { _path: "user.id" },
                email: { _path: "user.email" },
                groups: newIndexable("user.groups", (i) => {
                    return {
                        _path: `user.groups${i}`,
                        id: { _path: `user.groups${i}.id` },
                        name: { _path: `user.groups${i}.name` },
                    }
                }),
                organizations: newIndexable(
                    "user.organizations",
                    (identifier) => {
                        return {
                            _path: `user.organizations${identifier}`,
                            name: {
                                _path: `user.organizations${identifier}.name`,
                            },
                            id: { _path: `user.organizations${identifier}.id` },
                            tags: newIndexable(
                                `user.organizations${identifier}.tags`,
                                (identifier2) => {
                                    return {
                                        _path: `user.organizations${identifier}.tags${identifier2}`,
                                    }
                                },
                            ),
                            group: {
                                _path: `user.organizations${identifier}.group`,
                                id: {
                                    _path: `user.organizations${identifier}.group.id`,
                                },
                                name: {
                                    _path: `user.organizations${identifier}.group.name`,
                                },
                            },
                            sharedComments: {
                                _path: `user.organizations${identifier}.sharedComments`,
                            },
                            sharedTickets: {
                                _path: `user.organizations${identifier}.sharedTickets`,
                            },
                            externalId: {
                                _path: `user.organizations${identifier}.externalId`,
                                _writeType: "",
                            },
                            details: {
                                _path: `user.organizations${identifier}.details`,
                                _writeType: "",
                            },
                            notes: {
                                _path: `user.organizations${identifier}.notes`,
                                _writeType: "",
                            },
                            domains: {
                                _path: `user.organizations${identifier}.group.domains`,
                                _writeType: "",
                            },
                        }
                    },
                ),
                identities: newIndexable("user.identities", (i) => {
                    return {
                        _path: `user.identities${i}`,
                        id: { _path: `user.identities${i}.id` },
                        type: { _path: `user.identities${i}.type` },
                        value: { _path: `user.identities${i}.value` },
                        verified: { _path: `user.identities${i}.verified` },
                        primary: { _path: `user.identities${i}.primary` },
                        userId: { _path: `user.identities${i}.userId` },
                        undeliverableCount: {
                            _path: `user.identities${i}.undeliverableCount`,
                        },
                        deliverableState: {
                            _path: `user.identities${i}.deliverableState`,
                        },
                    }
                }),
                name: { _path: "user.name" },
                role: { _path: "user.role" },
                externalId: { _path: "user.externalId", _writeType: "" },
                locale: { _path: "user.locale" },
                details: { _path: "user.details", _writeType: "" },
                notes: { _path: "user.notes", _writeType: "" },
                alias: { _path: "user.alias", _writeType: "" },
                signature: { _path: "user.signature", _writeType: "" },
                timeZone: {
                    _path: "user.timeZone",
                    name: { _path: "user.timeZone.name" },
                    translatedName: { _path: "user.timeZone.translatedName" },
                    ianaName: { _path: "user.timeZone.ianaName" },
                    offset: { _path: "user.timeZone.ianaName" },
                    FormattedOffset: { _path: "user.timeZone.formattedOffset" },
                },
                tags: newIndexable("user.tags", (i) => {
                    return { _path: `user.tags${i}` }
                }),
                avatarUrl: { _path: "user.avatarUrl" },
            }

            export const userFields = newIndexable("userFields", (i) => {
                return { _path: `userFields${i}` }
            })
        }

        export namespace Actions {
            export const userFields: IndexableActionPath<UserFields> = (i) => {
                return {
                    show: { _path: `userFields${i}.show` },
                    hide: { _path: `userFields${i}.hide` },
                    toggle: { _path: `userFields${i}.toggle` },
                }
            }
        }

        export namespace Events {
            export namespace user {
                export namespace alias {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.alias.changed",
                    }
                }

                export namespace avatarUrl {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.avatarUrl.changed",
                    }
                }

                export namespace details {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.details.changed",
                    }
                }

                export namespace email {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.email.changed",
                    }
                }

                export namespace externalId {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.externalId.changed",
                    }
                }

                export namespace groups {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.groups.changed",
                    }
                }

                export namespace name {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.name.changed",
                    }
                }

                export namespace notes {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.notes.changed",
                    }
                }

                export namespace role {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.role.changed",
                    }
                }

                export namespace signature {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.signature.changed",
                    }
                }

                export namespace tags {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.tags.changed",
                    }
                }

                export namespace timeZone {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.timeZone.changed",
                    }
                }

                export namespace organizations {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "user.organizations.changed",
                    }
                }

                export function custom_field(identifier: string): {
                    changed: ZendeskEvent<() => void | Promise<void>>
                } {
                    return {
                        changed: {
                            _path: `user.customField:${identifier}.changed`,
                        },
                    }
                }
            }
        }
    }

    export namespace OrganizationSidebar {
        export namespace Events {
            export namespace organization {
                export namespace details {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.details.changed",
                    }
                }
                export namespace domains {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.domains.changed",
                    }
                }
                export namespace externalId {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.externalId.changed",
                    }
                }
                export namespace group {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.group.changed",
                    }
                }
                export namespace name {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.name.changed",
                    }
                }
                export namespace notes {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.notes.changed",
                    }
                }
                export namespace sharedTickets {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.sharedTickets.changed",
                    }
                }
                export namespace sharedComments {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.sharedComments.changed",
                    }
                }
                export namespace tags {
                    export const changed: ZendeskEvent<
                        () => void | Promise<void>
                    > = {
                        _path: "organization.tags.changed",
                    }
                }
                export const custom_field = (
                    identifier: string,
                ): { changed: ZendeskAction<() => void | Promise<void>> } => {
                    return {
                        changed: {
                            _path: `organization.customField:${identifier}.changed`,
                        },
                    }
                }
            }
        }

        export namespace Objects {
            export const organization: ZendeskObject<Organization> = {
                _path: "organization",
                name: { _path: "organization.name" },
                id: { _path: "organization.id" },
                tags: newIndexable("organization.tags", (i) => {
                    return { _path: `organization.tags${i}` }
                }),
                group: {
                    _path: "organization.group",
                    name: { _path: "organization.group.name" },
                    id: { _path: "organization.group.id" },
                },
                sharedComments: { _path: "organization.sharedComments" },
                sharedTickets: { _path: "organization.sharedTickets" },
                externalId: {
                    _path: "organization.externalId",
                    _writeType: "",
                },
                notes: { _path: "organization.notes", _writeType: "" },
                details: { _path: "organization.details", _writeType: "" },
                domains: { _path: "organization.domains", _writeType: "" },
            }

            export const organizationFields: ZendeskIndexable<
                OrganizationProfilePage.Field[]
            > = newIndexable("organizationFields", (i) => {
                return {
                    _path: `organizationFields${i}`,
                    isVisible: { _path: `organizationFields${i}.isVisible` },
                    name: { _path: `organizationFields${i}.name` },
                    options: newIndexable(
                        `organizationFields${i}.options`,
                        (j) => {
                            return {
                                _path: `organizationFields${i}.options${j}`,
                                value: {
                                    _path: `organizationFields${i}.options${j}.value`,
                                },
                                label: {
                                    _path: `organizationFields${i}.options${j}.label`,
                                },
                            }
                        },
                    ),
                }
            })
        }

        export namespace Actions {
            export const organizationFields: IndexableActionPath<
                OrganizationProfilePage.Field[]
            > = newIndexableActionPath((i) => {
                return {
                    hide: { _path: `organizationFields${i}.hide` },
                    show: { _path: `organizationFields${i}.show` },
                    toggle: { _path: `organizationFields${i}.toggle` },
                }
            })
        }
    }

    export namespace TopBar {
        export namespace Actions {
            export const popover: ZendeskAction<Popover> = { _path: "popover" }

            export const preloadPane: ZendeskAction<() => void> = {
                _path: "preloadPane",
            }

            export const iconSymbol: ZendeskAction<IconSymbol> = {
                _path: "iconSymbol",
            }

            export const iconChars: ZendeskAction<IconChars> = {
                _path: "iconChars",
            }
        }

        export namespace Events {
            export namespace pane {
                export const activated: ZendeskEvent<
                    () => void | Promise<void>
                > = {
                    _path: "pane.activated",
                }
                export const deactivated: ZendeskEvent<
                    () => void | Promise<void>
                > = { _path: "pane.deactivated" }
                export const deactivatedactivated = deactivated // backwards compatibility
            }
        }
    }

    export namespace NavBar {
        export namespace Actions {
            export const preloadPane: ZendeskAction<() => void> = {
                _path: "preloadPane",
            }

            export const iconSymbol: ZendeskAction<IconSymbol> = {
                _path: "iconSymbol",
            }

            export const iconChars: ZendeskAction<IconChars> = {
                _path: "iconChars",
            }
        }

        export namespace Events {
            export namespace pane {
                export const activated: ZendeskEvent<
                    () => void | Promise<void>
                > = {
                    _path: "pane.activated",
                }
                export const deactivatedactivated: ZendeskEvent<
                    () => void | Promise<void>
                > = { _path: "pane.deactivated" }
            }
            export namespace app {
                export namespace route {
                    export const changed: ZendeskEvent<AppRouteChanged> = {
                        _path: "app.route.changed",
                    }
                }
            }
        }
    }

    export namespace Modal {
        export namespace Actions {
            export const destroy: ZendeskAction<Destroy> = { _path: "destroy" }
        }

        export namespace Events {
            export namespace modal {
                export const close: ZendeskEvent<ModalClose> = {
                    _path: "modal.close",
                }
            }
        }
    }

    export namespace TicketEditor {
        export namespace Events {
            export namespace ticket {
                export namespace editor {
                    export const targetChannel: ZendeskEvent<
                        () => void | Promise<void>
                    > = { _path: "ticket.editor.targetChannel.changed" }
                    export const capabilities: ZendeskEvent<
                        () => void | Promise<void>
                    > = { _path: "ticket.editor.capabilities.changed" }
                }
            }

            export namespace pane {
                export const activated: ZendeskEvent<
                    () => void | Promise<void>
                > = {
                    _path: "pane.activated",
                }
            }
        }

        export namespace Actions {
            export namespace ticket {
                export const editor: ZendeskActionPath<TicketEditor> = {
                    insert: { _path: "ticket.editor.insert" },
                    indent: { _path: "ticket.editor.indent" },
                    outdent: { _path: "ticket.editor.outdent" },
                    bold: { _path: "ticket.editor.bold" },
                    italic: { _path: "ticket.editor.italic" },
                    unorderedList: { _path: "ticket.editor.unorderedList" },
                    orderedList: { _path: "ticket.editor.orderedList" },
                    blockquote: { _path: "ticket.editor.blockquote" },
                    codespan: { _path: "ticket.editor.codespan" },
                    codeblock: { _path: "ticket.editor.codeblock" },
                    hyperlink: { _path: "ticket.editor.hyperlink" },
                    inlineImage: { _path: "ticket.editor.inlineImage" },
                    hr: { _path: "ticket.editor.hr" },
                }
            }

            export namespace app {
                export const close: ZendeskEvent<() => void | Promise<void>> = {
                    _path: "app.close",
                }
            }
        }

        export namespace Objects {
            export namespace ticket {
                export const editor: ZendeskObject<TicketEditor> = {
                    _path: "ticket.editor",
                    targetChannel: {
                        _path: "ticket.editor.targetChannel",
                        name: { _path: "ticket.editor.name" },
                        sessionActive: { _path: "ticket.editor.sessionActive" },
                        sessionBased: { _path: "ticket.editor.sessionBased" },
                    },
                    capabilities: {
                        _path: "ticket.editor.capabilities",
                        richText: {
                            _path: "ticket.editor.capabilities.richText",
                        },
                    },
                }
            }
        }
    }

    export namespace Background {
        export namespace Events {
            export namespace ticket {
                export const saved: ZendeskEvent<
                    (data: { ticket: Ticket }) => void | Promise<void>
                > = { _path: "ticket.saved" }
            }
        }
    }
}
