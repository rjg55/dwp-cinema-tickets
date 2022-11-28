const TicketTypeRequest = require("./lib/TicketTypeRequest.js");
const {
  InvalidPurchaseException,
} = require("./lib/InvalidPurchaseException.js");

class TicketService {
  constructor(ticketsRequest) {
    this.accountId = ticketsRequest.accountId;
    this.infantTickets = ticketsRequest.tickets.infant;
    this.childTickets = ticketsRequest.tickets.child;
    this.adultTickets = ticketsRequest.tickets.adult;
  }

  _calculateTotalTicketAmount() {
    let invalidPurchase = false;
    let errorMessage = "";

    if (this.infantTickets + this.childTickets + this.adultTickets > 20) {
      invalidPurchase = true;
      errorMessage = "Max number of tickets is 20";
    }

    if (this.adultTickets === 0) {
      invalidPurchase = true;
      errorMessage = "1 or more adult ticket must be bought";
    }

    if (invalidPurchase) {
      const instanceOfInvalidPurchase = new InvalidPurchaseException(
        Error(errorMessage)
      );

      return instanceOfInvalidPurchase.invalidPurchase();
    }
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  }
}

module.exports = { TicketService };
