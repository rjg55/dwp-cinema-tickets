const { TicketService } = require("../src/pairtest/TicketService");

beforeEach(() => {
  const ticketPurchaseDetails = {
    accountId: 1,
    tickets: { INFANT: 0, CHILD: 0, ADULT: 0 },
  };
  const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);
});
afterEach(() => {
  const ticketPurchaseDetails = {
    accountId: 1,
    tickets: { INFANT: 0, CHILD: 0, ADULT: 0 },
  };
  const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);
});

describe.only("ticketPurchaseDetails (Argument checks)", () => {
  test("should return an error with total tickets > 20", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 0, CHILD: 0, ADULT: 21 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: Max number of tickets is 20");
  });
  test("should return an error with 0 ADULTs", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 0, CHILD: 0, ADULT: 0 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: 1 or more ADULT ticket must be bought");
  });
  test("should return an error when infants > ADULTs", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 0, ADULT: 4 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: Infants must not exceed number of ADULTs");
  });
  test("should return an error when accountID is 0", () => {
    const ticketPurchaseDetails = {
      accountId: 0,
      tickets: { INFANT: 0, CHILD: 0, ADULT: 4 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: Invalid AccountID");
  });
  test("should return an error when accountID is not an integer", () => {
    const ticketPurchaseDetails = {
      accountId: 1.1,
      tickets: { INFANT: 0, CHILD: 0, ADULT: 4 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual("Error: Invalid AccountID");
  });
});

describe("calculateTotalticketAmount", () => {
  test("should return a number", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 1, ADULT: 5 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(typeof actual).toEqual("number");
  });
  test("should return 110 for 5 infants, 1 child and 5 adults", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 1, ADULT: 5 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateTotalTicketAmount();

    expect(actual).toEqual(110);
  });
});
