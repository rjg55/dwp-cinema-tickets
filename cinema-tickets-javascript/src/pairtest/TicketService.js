const { TicketTypeRequest } = require("./lib/TicketTypeRequest.js");
const {
  InvalidPurchaseException,
} = require("./lib/InvalidPurchaseException.js");

class TicketService {
  constructor(ticketsRequest) {
    for (const ticketType in ticketsRequest.tickets) {
      const ticketTypeCheck = new TicketTypeRequest(
        ticketType,
        ticketsRequest.tickets[ticketType]
      );

      ticketTypeCheck.getNoOfTickets();
      ticketTypeCheck.getTicketType();
    }

    this.accountId = ticketsRequest.accountId;
    this.infantTickets = ticketsRequest.tickets.INFANT;
    this.childTickets = ticketsRequest.tickets.CHILD;
    this.adultTickets = ticketsRequest.tickets.ADULT;
    this.totalTicketAmount = 0;
    this.totalSeats = 0;
  }

  _calculateTotalTicketAmount() {
    let invalidPurchase = false;
    let errorMessage = "";

    if (this.accountId === 0 || !Number.isInteger(this.accountId)) {
      const instanceOfInvalidPurchase = new InvalidPurchaseException(
        Error("Invalid AccountID")
      );

      return instanceOfInvalidPurchase.invalidPurchase();
    }

    if (this.infantTickets + this.childTickets + this.adultTickets > 20) {
      invalidPurchase = true;
      errorMessage = "Max number of tickets is 20";
    }

    if (this.adultTickets === 0) {
      invalidPurchase = true;
      errorMessage = "1 or more ADULT ticket must be bought";
    }

    if (this.infantTickets > this.adultTickets) {
      errorMessage = "Infants must not exceed number of ADULTs";
      invalidPurchase = true;
    }

    let totalChildAmount = this.childTickets * 10;
    let totalAdultAmount = this.adultTickets * 20;

    this.totalTicketAmount = totalChildAmount + totalAdultAmount;

    if (invalidPurchase) {
      const instanceOfInvalidPurchase = new InvalidPurchaseException(
        Error(errorMessage)
      );

      return instanceOfInvalidPurchase.invalidPurchase();
    }

    return this.totalTicketAmount;
  }

  _calculateNoOfSeats() {
    this.totalSeats = this.adultTickets + this.childTickets;

    return this.totalSeats;
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets() {
    // throws InvalidPurchaseException
  }
}

module.exports = { TicketService };
