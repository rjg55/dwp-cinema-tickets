const { TicketService } = require("../src/pairtest/TicketService");
const {
  TicketPaymentService,
} = require("../src/thirdparty/paymentgateway/TicketPaymentService");

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

describe("ticketPurchaseDetails (Argument checks)", () => {
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

describe("calculateNoOfSeats", () => {
  test("should return a number", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 1, ADULT: 5 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateNoOfSeats();

    expect(typeof actual).toEqual("number");
  });
  test("should return 5 for 1 infant, 1 child and 4 adults", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 1, CHILD: 1, ADULT: 4 },
    };

    const ticketPurchaseRequest = new TicketService(ticketPurchaseDetails);

    const actual = ticketPurchaseRequest._calculateNoOfSeats();

    expect(actual).toEqual(5);
  });
});

describe("purchaseTickets", () => {
  test("paymentRequest", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 1, ADULT: 5 },
    };

    const ticketRequest = new TicketService(ticketPurchaseDetails);

    const totalAmount = ticketRequest._calculateTotalTicketAmount();

    const purchaseRequest = ticketRequest.purchaseTickets();

    expect(purchaseRequest).toEqual("Payment successful");
  });
  test("seatRequest", () => {
    const ticketPurchaseDetails = {
      accountId: 1,
      tickets: { INFANT: 5, CHILD: 1, ADULT: 5 },
    };

    const ticketRequest = new TicketService(ticketPurchaseDetails);

    const totalSeats = ticketRequest._calculateNoOfSeats();

    const purchaseRequest = ticketRequest.purchaseTickets();

    expect(purchaseRequest).toEqual("Payment successful");
  });
});
