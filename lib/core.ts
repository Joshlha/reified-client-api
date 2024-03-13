import { ZendeskAction, ZendeskProperty, ZendeskEvent } from "./wrapper_types"
import { Resize, Create, Instances } from "./zendesk_types/support_apps/common"

export namespace Core {
    export namespace Actions {
        export const resize: ZendeskAction<Resize> = { _path: "resize" }

        export namespace instances {
            export const create: ZendeskAction<Create> = {
                _path: "instances.create",
            }
        }
    }

    export namespace Properties {
        export const requirement = (
            identifier: string,
        ): ZendeskProperty<{ requirement_id: string; resource_type: any }> => {
            return { _path: `requirement:${identifier}` }
        }

        export const instances: ZendeskProperty<Instances> = {
            _path: "instances",
        }

        export const assetURL = (
            identifier: string,
        ): ZendeskProperty<string> => {
            return { _path: `assetURL:${identifier}` }
        }

        export const isCollapsed: ZendeskProperty<boolean> = {
            _path: "isCollapsed",
        }

        export namespace viewport {
            export const size: ZendeskProperty<{
                width: string
                height: string
            }> = {
                _path: "viewport.size",
            }
        }
    }

    export namespace Events {
        export namespace app {
            export const registered: ZendeskEvent<(data: any) => any> = {
                _path: "app.registered",
            }
            export const activated: ZendeskEvent<(data: any) => any> = {
                _path: "app.activated",
            }
            export const deactivated: ZendeskEvent<(data: any) => any> = {
                _path: "app.deactivated",
            }
            export const expanded: ZendeskEvent<(data: any) => any> = {
                _path: "app.expanded",
            }
            export const collapsed: ZendeskEvent<(data: any) => any> = {
                _path: "app.collapsed",
            }
        }

        export namespace instance {
            export const created: ZendeskEvent<(data: any) => any> = {
                _path: "instance.created",
            }
            export const registered: ZendeskEvent<(data: any) => any> = {
                _path: "instance.registered",
            }
        }

        export namespace window {
            export const scroll: ZendeskEvent<(data: any) => any> = {
                _path: "window.scroll",
            }
            export const resize: ZendeskEvent<
                (data: { width: number; height: number }) => void
            > = {
                _path: "window.resize",
            }
        }
    }
}
