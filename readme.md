# Reified Client API

A typescript API to help Zendesk app developers with creating type-safe projects. 

## Features

*This section is WIP*

## Usage

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

Types representing actual Zendesk objects or functions which are returned from or passed to API calls are kept in `lib/zendesk_types`. The actual API, along with the helper types and functions that make it work, is simply in `lib/` and current has the `Core` and `Support` packages.

## Contribution

Contributions of any kind (additional API support, polish to existing APIs, test files) are welcome.

## Disclaimer

This is **not** an official Inductive Automation product and is not affiliated with, supported by, maintained by, or
otherwise associated with Inductive Automation in any way. This software is provided as-is with no warranty.
