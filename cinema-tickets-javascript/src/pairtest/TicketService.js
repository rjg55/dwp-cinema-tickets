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

    if (this.infantTickets > this.adultTickets) {
      errorMessage = "Infants must not exceed number of adults";
      invalidPurchase = true;
    }

    let totalChildAmount = this.childTickets * 10;
    let totalAdultAmount = this.adultTickets * 20;

    let totalTicketAmount = totalChildAmount + totalAdultAmount;

    if (invalidPurchase) {
      const instanceOfInvalidPurchase = new InvalidPurchaseException(
        Error(errorMessage)
      );

      return instanceOfInvalidPurchase.invalidPurchase();
    }

    return totalTicketAmount;
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  }
}

module.exports = { TicketService };
