# Reified Client API

> ### re·i·fy
> /ˈrēəˌfī/<br>
> *verb* **formal**<br>
> make (something abstract) more concrete or real<br>
> *"these instincts are, in humans, reified as verbal constructs"*

A typescript API to help Zendesk app developers with creating type-safe projects. 

## Features

No more typos - the full ZAFClient API is available via type-safe paths to the objects, events, or actions you wish to access.

No more passing in the string you just gave the ZAFClient to get the actual object. 
```
// Old syntax
const ticketObject = (await client.get("ticket"))["ticket"]

// New syntax
const ticketObject = await client.get(Support.TicketSidebar.Objects.ticket)
```

The API is broken up first by Zendesk API, then the path type (Event, Object, Action), then then app location

### Getting an object
```
const ticket = await client.get(Support.TicketSidebar.Objects.ticket) // Returns object of type Ticket
console.log(ticket.assignee)
/*
{
    user: { /* user object */ },
    group: { /* group object */ }
}
*/
```

### Handling an event
```
client.on(Core.Events.app.registered, (appData: any) => {
    // do stuff
})
```

### Invoking an action
```
client.invoke(Support.TicketSidebar.Actions.ticketFields(2).enable)
```

### Getting custom fields
The `custom_field` path is only available for a few zendesk objects, such as ticket or user.
- Ensure non-null assertions are enabled by your linter or IDE
- Place the assertion after `custom_field` before the invokation
- The `custom_field` callable object will return a type of `unknown` by default. You must specify the type via a type parameter or by casting.
```
const customUserField = await client.get(Support.UserSidebar.Objects.user.custom_field!<string>("CustomFieldID"))
// or
const customUserField = await client.get(Support.UserSidebar.Objects.user.custom_field!("CustomFieldID")) as string
```

### Indexable objects and properties
You can get individual elements of indexable objects and properties via their callable object paths and passing in either an integer or string.
Refer to the ZAFClient api for which to use. Most indexables can take either an integer index or a string ID.
```
const firstGroupNameOfSecondCommentAuthor = await client.get(Support.TicketSidebar.Objects.ticket.comments(2).author.groups(1).name)
```

### Getting multiple objects at once
The API also supports the "bulk" get function, though you will need to index into the returned object to get the actual object.

Conveniently, you can use the `_path` property to get the underlying string value which is passed to the client. Putting it all together would look like this.
```
const objsToGet = [
    Support.TicketSidebar.Objects.ticket.comment,
    Support.Common.Objects.currentUser
]

const returnedObj = await client.get(objsToGet) // type: { [key: string]: any }

// Comment and User interfaces are available for import, along with many others
const commentObj = returnedObj[objsToGet[0]._path] as Comment
const userObj = returnedObj[objsToGet[1]._path] as User 
```

## Usage

*If you don't have a typescript project set up, see [this scaffold](https://github.com/Joshlha/zd-ts-react) for a Zendesk app written in Typescript*

1. In your existing typescript project, run 
```
npm i reified-client-api
```
2. You should now declare `ZAFClient` as a known `const` in your app's entrypoint.
```
declare const ZAFClient: any;
```
3. Finally, initialize the `ReifiedClient` by passing in the client instance
```
const client = new ReifiedClient(ZAFClient.init())
```

## Development

Since types are only implemented for the `Support` and `Core` APIs, there is still work to be done to implement the other APIs. 


- [x] Apps Core API
    - [x] ZAF Client API
    - [x] Core Apps API
- [x] Apps Support API
    - [x] All Locations
    - [x] Ticket and New Ticket Sidebar
    - [x] Organization Sidebar
    - [x] User Sidebar
    - [x] Top Bar
    - [x] Navbar
    - [x] Modal
    - [x] Ticket Editor
    - [x] Background
- [ ] Apps Chat API
    - [ ] All Locations
    - [ ] Chat Sidebar
    - [ ] Background
- [ ] Apps Sell API
    - [ ] All Locations
    - [ ] Background
    - [ ] Company Sidebar
    - [ ] Deal Sidebar
    - [ ] Lead Sidebar
    - [ ] Person Sidebar
    - [ ] Top Bar
    - [ ] Call Log Editor
    - [ ] Modal
    - [ ] Note Editor
    - [ ] Visit Composer

Types representing actual Zendesk objects or functions which are returned from or passed to API calls are kept in `lib/zendesk_types`. The actual API, along with the helper types and functions that make it work, are simply in `lib/` and currently contains the `Core` and `Support` APIs.

## Contribution

Contributions of any kind (additional API support, polish to existing APIs, test files) are welcome.

## Disclaimer

This is **not** an official Inductive Automation product and is not affiliated with, supported by, maintained by, or
otherwise associated with Inductive Automation in any way. This software is provided as-is with no warranty.
