const { TicketService } = require("../src/pairtest/TicketService");

describe("ticketPurchaseDetails (Argument checks)", () => {
  test("should return an error with total tickets > 20", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { infant: 0, child: 0, adult: 21 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: Max number of tickets is 20");
  });
});
