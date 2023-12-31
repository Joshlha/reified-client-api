import { expect, jest, test, describe } from '@jest/globals'
import { ReifiedClient, Support } from './dist/index'
import { User } from './dist/zendesk_types/support_apps/common'

describe("Paths Test", () => {
    test("Test ticket path", () => {
        expect(Support.TicketSidebar.Objects.ticket._path).toBe("ticket")
    })
    test("Dynamic path", () => {
        expect(Support.TicketSidebar.Objects.ticket.custom_field!("asdf")._path).toBe("ticket.customField:custom_field_asdf")
    })
    test("Indexable Path", () => {
        expect(Support.TicketSidebar.Objects.ticket.collaborators(4).identities(3).type._path).toBe("ticket.collaborators.4.identities.3.type")
    })
})
