import { Context, MetaData } from "./support_apps/common"

export declare class Client {
    /**
     * Requests context for the app, such as the host and location. Depending on the location, the context may provide additional identifiers that you can use with the REST API to request additional data.
     * @returns {any} A JavaScript Promise any.
     */
    context(): Promise<Context>
    /**
     * Gets data from the UI asynchronously. For a complete list of supported paths, see:
     *
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-core-api/core_api/ | Core Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/ | Support Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-chat-api/introduction/ | Chat Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-sell-api/introduction/ | Sell Apps API}
     * @param {string | string[]} path
     * @returns {Promise<any>} A JavaScript Promise any.
     */
    get(path: string | string[]): Promise<any>
    /**
     * Returns whether or not an event has the specified handler attached to it.
     * @param {string} name the name of the event
     * @param {any} handler the handler you want to test
     * @returns {boolean}
     */
    has(name: string, handler: any): boolean
    /**
     * Initialize a ZAFClient for another location.
     * @param {string} instanceGuid the GUID for the desired instance of the app
     * @returns {Client} An instance of ZAFClient for the requested instance GUID.
     */
    instance(instanceGuid: string): Client
    /**
     * Executes an action identified by the name path parameter, or multiple actions defined in the obj argument, within the product interface. For a complete list of supported paths, see:
     *
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-core-api/core_api/ | Core Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/ | Support Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-chat-api/introduction/ | Chat Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-sell-api/introduction/ | Sell Apps API}
     * @param {any} name the path to call
     * @param {any} args (optional) arguments to be passed to the call
     * @returns {Promise<any>} A JavaScript Promise any with the value returned from the method call(s).
     */
    invoke(name: string, ...args: any): Promise<any>
    /**
     * Executes an action identified by the name path parameter, or multiple actions defined in the obj argument, within the product interface. For a complete list of supported paths, see:
     *
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-core-api/core_api/ | Core Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/ | Support Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-chat-api/introduction/ | Chat Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-sell-api/introduction/ | Sell Apps API}
     * @param {{ [name: string]: any[] }} obj an any containing invoke paths as keys and arrays of arguments as values
     * @returns {Promise<any>} A JavaScript Promise any with the value returned from the method call(s).
     */
    invoke(obj: { [name: string]: any[] }): Promise<any>
    /**
     * Requests metadata for the app, such as the app id, installation id, app plan information, and Stripe subscription id (if applicable).
     * @returns {Promise<any>} A JavaScript Promise object.
     */
    metadata(): Promise<MetaData>
    /**
     * Allows you to remove a handler for a framework event.
     * @param {string} name the name of the event
     * @param {any} handler the function you attached earlier with `on`
     */
    off(name: string, handler: any): void
    /**
     * Allows you to add handlers to a framework event. You can add as many handler as you wish. They will be executed in the order they were added.
     * @param {string} name The name of the framework event you want to listen to. This can be framework, request, or custom events
     * @param {any} handler a function to be called when this event fires
     * @param {any} [context] (optional) the value of this within your handler
     * @returns {any} - A Javascript Promise any
     */
    on(name: string, handler: any, context?: any): void
    /**
     * Makes an HTTP request. See {@link https://developer.zendesk.com/documentation/apps/getting-started/making-api-requests-from-a-zendesk-app/ | Making API requests from a Zendesk app.}
     * @param {string | ClientRequestOptions} options the url of the resource to request, or a {@link ClientRequestOptions | ClientRequestOptions} object.
     * @returns A Javascript Promise object.
     */
    request(options: string | ClientRequestOptions): Promise<any>
    /**
     * Sets data in the UI asynchronously. For a complete list of supported paths, see:
     *
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-core-api/core_api/ | Core Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/ | Support Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-chat-api/introduction/ | Chat Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-sell-api/introduction/ | Sell Apps API}
     *
     * Some path segments can take arguments that you can specify using a colon syntax. For example, to set the due date of a task, you could call `client.set('ticket.customField:due_date', new Date())`.
     * @param {string} key the path to which to set the value `value`
     * @param {any} value the value to set
     * @returns {Promise<any} a JavaScript Promise object.
     */
    set(key: string, value: any): Promise<any>
    /**
     * Sets data in the UI asynchronously. For a complete list of supported paths, see:
     *
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-core-api/core_api/ | Core Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/ | Support Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-chat-api/introduction/ | Chat Apps API}
     * - {@link https://developer.zendesk.com/api-reference/apps/apps-sell-api/introduction/ | Sell Apps API}
     *
     * Some path segments can take arguments that you can specify using a colon syntax. For example, to set the due date of a task, you could call `client.set('ticket.customField:due_date', new Date())`.
     * @param {{ [name: string]: any }} obj an object containing the keys and values to update
     * @returns {Promise<any>} A JavaScript Promise object.
     */
    set(obj: { [name: string]: any }): Promise<any>
    /**
     * Triggers the specified event on the client.
     * @param {string} name  the name of the event you want to trigger
     * @param {any} data (optional) data you want to pass to the handler
     * @returns {void}
     */
    trigger(name: string, data?: any): void
}

export interface ClientRequestOptions {
    accepts?: any
    autoRetry?: boolean
    cache?: boolean
    contentType?: boolean | string
    cors?: boolean
    crossDomain?: boolean
    data?: any | string | any[]
    dataType?: string
    headers?: any
    httpCompleteResponse?: boolean
    ifModified?: boolean
    jwt?: any
    mimeType?: string
    secure?: boolean
    timeout?: number
    traditional?: boolean
    type?: string
    url: string
    xhrFields?: any
}
