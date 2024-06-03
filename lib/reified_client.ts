import {
    ZendeskEvent,
    ZendeskObjectPath,
    ZendeskWritableObject,
    ZendeskWritableProperty,
    ZendeskAction,
} from "./wrapper_types"
import { Context, MetaData } from "./zendesk_types/support_apps/common"
import { Client, ClientRequestOptions } from "./zendesk_types/zaf_sdk"

export class ReifiedClient {
    zafClient: Client

    constructor(client: Client) {
        this.zafClient = client
    }

    async context(): Promise<Context> {
        return await this.zafClient.context()
    }

    has(name: string, handler: any): boolean {
        return this.zafClient.has(name, handler)
    }

    reifiedInstance(instanceGuid: string): ReifiedClient {
        return new ReifiedClient(this.zafClient.instance(instanceGuid))
    }

    instance(instanceGuid: string): Client {
        return this.zafClient.instance(instanceGuid)
    }

    async metadata(): Promise<MetaData> {
        return await this.zafClient.metadata()
    }

    on<T>(event: ZendeskEvent<T>, handler: T): void {
        this.zafClient.on(event._path, handler)
    }

    off<T>(event: ZendeskEvent<T>, handler: T): void {
        this.zafClient.off(event._path, handler)
    }

    async get(props: ZendeskObjectPath<any>[]): Promise<{ [path: string]: any }>
    async get<T>(propOrObject: ZendeskObjectPath<T>): Promise<T>
    async get<T>(propOrProps: ZendeskObjectPath<T> | ZendeskObjectPath<any>[]) {
        if (Array.isArray(propOrProps)) {
            return await this.zafClient.get(
                propOrProps.map((item) => item._path),
            )
        } else {
            return (await this.zafClient.get(propOrProps._path))[
                propOrProps._path
            ] as T
        }
    }

    async set<T, W>(
        propOrObject:
            | ZendeskWritableObject<T, W>
            | ZendeskWritableProperty<T, W>,
        arg: W,
    ): Promise<T> {
        return (await this.zafClient.set(propOrObject._path, arg))[
            propOrObject._path
        ] as T
    }

    async invoke<F extends (...args: any) => any>(
        action: ZendeskAction<F>,
        ...args: Parameters<F>
    ): Promise<ReturnType<F>> {
        return await this.zafClient.invoke(action._path, ...(args as any))
    }

    async request<T = any>(options: string | ClientRequestOptions): Promise<T> {
        return (await this.zafClient.request(options)) as T
    }

    trigger<T>(event: ZendeskEvent<T>, handler?: T): void {
        this.zafClient.trigger(event._path, handler)
    }
}
