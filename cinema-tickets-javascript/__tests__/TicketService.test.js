const { TicketService } = require("../src/pairtest/TicketService");

beforeEach(() => {
  const ticketPurchaseDetails = {
    accountId: 0,
    tickets: { infant: 0, child: 0, adult: 0 },
  };
  const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);
});
afterEach(() => {
  const ticketPurchaseDetails = {
    accountId: 0,
    tickets: { infant: 0, child: 0, adult: 0 },
  };
  const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);
});

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
  test("should return an error with 0 adults", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { infant: 0, child: 0, adult: 0 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: 1 or more adult ticket must be bought");
  });
});
