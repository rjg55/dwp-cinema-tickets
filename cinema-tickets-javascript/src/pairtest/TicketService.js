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
    () => {
      throw new Error("error");
    };

    let invalidPurchase = false;

    if (this.infantTickets + this.childTickets + this.adultTickets > 20) {
      invalidPurchase = true;
    }

    if (invalidPurchase) {
      const instanceOfInvalidPurchase = new InvalidPurchaseException(
        Error("Max number of tickets is 20")
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
